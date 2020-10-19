import { Client, ClientOptions, Collection } from "discord.js";
import { Logger } from "winston";
import { BroadcastManager } from "./music/utils";
import { chopprefix, getlogger, getnextarg, ProcessEvents } from "./rando";
import { Command } from "./text/commands/_command";

// TODO REMOVE THIS AND CONNECT THE DB
const prefix: string = "autumnt ";
export class AutumnBlaze {
   public readonly bot: Client;
   private token: string;
   private started: boolean = false;
   private stopped: boolean = false;
   private readonly logger: Logger;
   private readonly commands: Collection<string, Command>;
   public readonly voicebroadcastmanager?: BroadcastManager;
   public readonly botoptions?: ClientOptions & { enablevoice?: boolean };

   public constructor(token: string, botoptions?: ClientOptions & { enablevoice?: boolean }) {
      this.token = token;
      this.bot = new Client(botoptions);
      this.botoptions = botoptions;

      this.logger = getlogger("_mainbot");
      this.commands = new Collection<string, Command>();
      this.registermessagelistener();
      if (botoptions?.enablevoice === false) this.logger.debug("voice not enabled");
      this.voicebroadcastmanager = new BroadcastManager(this);

      this.logger.debug("okie constructed main bot");
   }

   public settoken(token: string): void {
      this.token = token;
   }

   public async start(): Promise<void> {
      if (this.started) return;

      await this.bot.login(this.token);
      this.bot.on("warn", warning => this.logger.warn(warning));
      this.logger.info("connected to discord!!");
      this.started = true;
   }

   public stop(): void {
      if (this.stopped) return;

      this.bot.destroy();
      this.logger.info("disconnected");
      this.stopped = true;
   }

   public registerstoplistener(name: ProcessEvents): void {
      process.on(name, () => {
         this.stop();
      });
   }

   public registercommand(cmd: Command): void {
      this.commands.set(cmd.name, cmd);
      this.logger.debug(`added command ${cmd.name}`);
   }

   private registermessagelistener(): void {
      this.bot.on("message", msg => {
         if (msg.author.bot) return;
         const commandnoprefix: string | false = chopprefix(prefix, msg.content);
         if (commandnoprefix === false) return;

         const commandandargs: [string, string] = getnextarg(commandnoprefix);

         const command: Command | undefined = this.commands.get(commandandargs[0]);
         if (command === undefined) return;

         // dont execute in news channels
         if (msg.channel.type === "news") return;
         // if its a dm and you allow dms
         // OR its a guild text channel and you allow guild text channels
         // execute!!
         // command should figure out which type of channel its handling if it cares

         if (msg.channel.type === "dm" && command.allowdm || msg.channel.type === "text" && command.allowguild) void command.exec(msg);
      });
   }

   public getcommands(): Collection<string, Command> {
      // clone to prevent modification
      return this.commands.clone();
   }
}
