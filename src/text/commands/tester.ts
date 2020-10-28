import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { categories, CategoryAndDataStuff, Command } from "./_command";

export class Testester extends Command {
   private readonly autumnblaze: AutumnBlaze;
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

   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];
   public readonly allowdm: boolean = false;
   public readonly allowguild: boolean = true;
   public readonly category: CategoryAndDataStuff<"test"> = categories.test;
   public readonly description: string = "test command lol";
   public readonly showinhelp: boolean = false;
}
