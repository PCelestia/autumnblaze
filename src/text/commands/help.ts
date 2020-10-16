import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { categories, CategoryAndDataStuff, Command } from "./_command";

export class HelpCommandthing extends Command {
   private readonly autumnblaze: AutumnBlaze;

   public constructor(autumnblaze: AutumnBlaze) {
      super("help");
      this.autumnblaze = autumnblaze;
   }

   public async exec(msg: Message): Promise<void> {
      this.autumnblaze.getcommands().forEach(cmd => {
         // h
      });
   }

   public perms: Array<PermissionFlags | PermissionString> = [];
   public allowdm: boolean = true;
   public allowguild: boolean = true;
   public category: CategoryAndDataStuff<"other"> = categories.other;
   public description: string = "this command shows help obviously lol";
   public showinhelp: boolean = true;
}
