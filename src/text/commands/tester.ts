import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { categories, CategoryAndDataStuff, Command } from "./command";

/** a tester command, dynamically loaded in only when running in dev mode */
export class Testester extends Command {
   private readonly autumnblaze: AutumnBlaze;

   /** construct zee tester cmd */
   public constructor(autumnblaze: AutumnBlaze) {
      super("test");
      this.autumnblaze = autumnblaze;
   }

   public async exec(msg: Message): Promise<void> {
      // h
      await msg.channel.send("h");
      if (!msg.guild) {
         this.logger.error("hmmmmmmmmm no guild on guild only command");
         return void msg.channel.send("no guild h");
      }
      await msg.channel.send((await this.autumnblaze.mango.getservconfig(msg.guild)).tojson());
   }

   public readonly perms = [];
   public readonly allowdm = false;
   public readonly allowguild = true;
   public readonly category = categories.test;
   public readonly description = "test command lol";
   public readonly showinhelp = false;
}
