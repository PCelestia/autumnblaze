import { Message, PermissionFlags, PermissionString, User } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { maxboopspermessage } from "../../consts";
import { categories, CategoryAndDataStuff, Command } from "./_command";

export class BoopersSchmoopers extends Command {
   private readonly autumnblaze: AutumnBlaze;

   public constructor(autumnblaze: AutumnBlaze) {
      super("boop");
      this.autumnblaze = autumnblaze;
   }

   public exec(msg: Message): void {
      const mentionedusers: Array<User> = msg.mentions.users.array();
      if (mentionedusers.length === 0) return void msg.channel.send(`*BOOPS* <@${msg.author.id}>`).catch(this.logger.error);
      if (mentionedusers.length >= maxboopspermessage) return void msg.channel.send("I can't boop that many people!").catch(this.logger.error);
      for (const user of mentionedusers) msg.channel.send(`*BOOPS* <@${user.id}>`).catch(this.logger.error);
   }

   public perms: Array<PermissionFlags | PermissionString> = [];
   public allowdm: boolean = false;
   public allowguild: boolean = true;

   public category: CategoryAndDataStuff<"fun"> = categories.fun;

   public showinhelp: boolean = true;
}
