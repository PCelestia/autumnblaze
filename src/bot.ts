import { Client, Message } from "discord.js";
import { Commandish } from "./commandish";
import { Command } from "./command";
import { chopprefix, getnextarg } from "./rando";

// poor man's logger because i am poor
export type Logger = (...args: any) => void;

export type Autumn = {
   stop(): void;
};
export type AutumnOpts = Readonly<{
   token: string;
   stdout?: Logger;
   stderr?: Logger;
   events: ReadonlyArray<string>;
   commandish?: ReadonlyArray<Commandish>;
   command?: ReadonlyArray<Command>;
   defaultprefix: string;
}>;

export async function createautumn(opts: AutumnOpts): Promise<Readonly<Autumn>> {
   const bot = new Client();
   const autumn: Autumn = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      stop() {}
   };

   // register commands, checking for dupes
   const commands: { [key: string]: ReturnType<Command> | undefined } = {};
   const duplicates: Array<string> = [];
   opts.command?.forEach(cmd => {
      const res = cmd({
         autumn,
         stderr: opts.stderr ?? console.log,
         stdout: opts.stdout ?? console.error
      });
      !commands[res.name]
         ? commands[res.name] = res
         : duplicates.push(res.name);
   });
   if (duplicates.length > 0) throw `duplicate commands: ${duplicates.join(", ")}`;

   // register commandishes
   const commandishes: Array<ReturnType<Commandish>> = [];
   opts.commandish?.forEach(cmdish => commandishes.push(cmdish({
      autumn,
      stderr: opts.stderr ?? console.log,
      stdout: opts.stdout ?? console.error
   })));

   // message listener
   bot.on("message", async msg => {
      // if no bot user, ignore all bots to prevent endless loop
      if (!bot.user && msg.author.bot) return;
      // else ignore self
      if (bot.user === msg.author) return;

      await docommands(msg);
      await docommandishes(msg);
   });

   await bot.login(opts.token);

   /** whether or not the bot is logged in, false if destroyed already */
   let up = true;

   // the stop function below checks if up is true, if it is true than its still
   // logged in, so destroy it
   // if its false, then its destroyed already, so it doesnt run destroy()
   // dont run destroy() twice
   const stop = () => up && (void (opts.stdout ?? console.log)("not up!") ?? void bot.destroy() ?? (up = false));
   autumn.stop = stop;

   opts.events.forEach(event => process.on(event, stop));
   (opts.stdout ?? console.log)("up!");

   return autumn;

   async function docommandishes(msg: Message) {
      for (const cmd of commandishes) {
         const res = await cmd(msg);
         if (res === false) break;
      }
   }

   async function docommands(msg: Message) {
      // put replier things here eventually
      const commandnoprefix = chopprefix(opts.defaultprefix, msg.content);
      if (!commandnoprefix) return;

      const [cmd, args] = getnextarg(commandnoprefix);
      const cmdfn = commands[cmd];
      if (!cmdfn) return;

      await cmdfn.cmd(args, msg);
   }
}
