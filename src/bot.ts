import { Client, ClientOptions, Collection, Message } from "discord.js";
import { Logger } from "winston";
import { Mango } from "./mango";
import { GuildConfig } from "./mango/struct";
import { BroadcastManager } from "./music/utils";
import { chopprefix, getlogger, getnextarg, ProcessEvents } from "./rando";
import { Command } from "./text/commands/command";

/** options for {@link AutumnBlaze} */
// eslint-disable-next-line @typescript-eslint/no-type-alias
export type AutumnBlazeOptions = ClientOptions & {
   /** discord bot token */
   token: string;
   /** default prefix to use */
   prefix: string;
   /** whether or not to enable voice module */
   enablevoice?: boolean;
   /** link to main mango database server */
   mangolink: string;
   /** link to pony database server (optional) */
   ponymangolink?: string;
   /** whether or not to cache responses from the database server,
    * (turn this off if for example you have a website dashboard type thing that
    * is a different process and modifies the database)
    */
   usemangocache?: boolean;
};

/**
 * the main client class thing! idk what to say to this lol
 *
 * i guess this one
 *
 * ... idk
 *
 * nvm
 *
 * [follow me on github lol](https://github.com/pcelestia/)
 */
export class AutumnBlaze {
   /**
    * [discord.js Client](https://discord.js.org/#/docs/main/stable/class/Client)
    * used to connect to discord gateway
    */
   public readonly bot: Client;
   /** token for the bot */
   private token: string;
   /** whether or not this instance has started yet, don't start twice */
   private started: boolean = false;
   /** whether or not this instance has stopped (after starting it). After it has stopped, it cannot be restarted */
   private stopped: boolean = false;
   /** logger for this main bot */
   private readonly logger: Logger;
   /** commands collection to store all the commands in */
   private readonly commands: Collection<string, Command>;
   /** manager for voice if enabled */
   public readonly voicebroadcastmanager?: BroadcastManager;
   /** mango instance for database */
   public readonly mango: Mango;
   /** options for the bot */
   public readonly botoptions: AutumnBlazeOptions;
   /**
    * generator functions for reply thread type things (where someone has a "conversation"
    * with the bot)
    */
   private readonly repliers: Collection<string, Generator<void, void, Message>>;

   /**
    * create! lol
    *
    * @param botoptions options for the bot
    */
   public constructor(botoptions: AutumnBlazeOptions) {
      this.token = botoptions.token;
      this.botoptions = botoptions;

      this.bot = new Client(this.botoptions);
      this.mango = new Mango({
         mainlink: this.botoptions.mangolink,
         ponylink: this.botoptions.ponymangolink,
         maindbname: "botbot",
         usecache: botoptions.usemangocache
      });

      this.logger = getlogger("_mainbot");
      this.repliers = new Collection<string, Generator<void, void, Message>>();
      this.commands = new Collection<string, Command>();

      this.bot.on("ready", () => {
         this.bot.user?.setPresence({
            status: "online",
            afk: false,
            activity: {
               name: "PING ME LOL"
            }
         }).catch(e => this.logger.warn(e));
      });
      this.registermessagelistener();
      this.registervoicestatelistener();
      if (botoptions.enablevoice === false) this.logger.debug("voice not enabled");
      this.voicebroadcastmanager = new BroadcastManager(this);
      this.logger.debug("okie constructed main bot");
   }

   /**
    * set token for this bot
    * @param token new token
    */
   public settoken(token: string): void {
      this.token = token;
   }

   /** start the bot, connect, connect and start database, get it ready for use! */
   public async start(): Promise<void> {
      if (this.started) return;

      await this.mango.start();
      await this.bot.login(this.token);
      this.logger.info("connected to discord!!");
      this.bot.on("warn", warn => this.logger.warn(warn));
      this.bot.on("error", error => this.logger.error(error));

      this.started = true;
   }

   /** stop the bot and disconnect from database, otherwise do cleanup operations */
   public stop(): void {
      if (this.stopped) return;

      this.bot.destroy();
      this.mango.stop();
      this.logger.info("disconnected");
      this.stopped = true;
   }

   /**
    * register a nodejs process listener to stop the bot
    * @param name name of the event to register
    * @returns nothing lol
    */
   public registerstoplistener(name: ProcessEvents): void {
      process.on(name, () => {
         this.stop();
      });
   }

   /**
    * register a new command!
    * @param cmd command instance to register
    */
   public registercommand(cmd: Command): void {
      if (this.commands.get(cmd.name)) throw new Error(`duplicate command "${cmd.name}"!`);
      this.commands.set(cmd.name, cmd);
      this.logger.debug(`added command ${cmd.name}`);
   }

   /** register the message listener to discord.js bot (only called once) */
   private registermessagelistener(): void {
      this.bot.on("message", async msg => {
         if (msg.author === this.bot.user) return;

         // check for replier of this channel, if exists then send msg to it to process
         // dont run command in this case
         const replier = this.repliers.get(msg.channel.id);
         if (replier) {
            const res = replier.next(msg);
            if (res.done) this.repliers.delete(msg.channel.id);
            return;
         }

         let config: GuildConfig | undefined = undefined;
         let msgcontent: string = msg.content;
         // the second conditional is not needed but satisfy tsc yk?
         if (msg.guild && msg.channel.type === "text") {
            config = await this.mango.getservconfig(msg.guild);

            // try to check prefix, return if it doesnt exist
            let commandnoprefix: string | false = "";
            if (config.prefix === "") commandnoprefix = chopprefix(this.botoptions.prefix, msgcontent);
            else commandnoprefix = chopprefix(config.prefix, msgcontent);
            if (commandnoprefix === false) return;
            else msgcontent = commandnoprefix;
         }
         // command name and arg lol
         const commandandargs: [string, string] = getnextarg(msgcontent);

         // try to get the command, execute if available
         const command: Command | undefined = this.commands.get(commandandargs[0]);
         if (command === undefined) return;
         if ((command.allowguild && (msg.channel.type === "text" || msg.channel.type === "news")) || (command.allowdm && msg.channel.type === "dm")) return void command.exec(msg, commandandargs[1], config);
      });
   }

   /**
    * get shallow copy of commands collection
    * @returns commands collection, shallow copied
    */
   public getcommands(): Collection<string, Command> {
      // clone to prevent modification
      // shallow copy should be fine
      return this.commands.clone();
   }

   /**
    * register a replier generator function
    * @param channelid the channel to execute this in
    * @param generatorfn the generator function to use
    */
   public registerreplier(channelid: string, generatorfn: () => Generator<void, void, Message>): void {
      const instance = generatorfn();
      instance.next(); // just to set it off once, it doesnt do anything here yet
      this.repliers.set(channelid, instance);
   }

   /** (eventually) register voicestate listener (for things like auto disconnect and stuff) */
   private registervoicestatelistener(): void {
      this.logger.info("registervoicestatelistener was called probably expecting it to do something lol");
      this.logger.info("it doesnt");
      // h
      // this.bot.on("voiceStateUpdate", (_oldstate, newstate) => {
      //
      // });
   }
}
