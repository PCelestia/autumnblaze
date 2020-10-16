import { Message, PermissionFlags, PermissionString, User } from "discord.js";
import { maxboopspermessage } from "../../consts";
import { categories, CategoryAndDataStuff, Command } from "./_command";

export class BoopersSchmoopers extends Command {
   protected readonly boopstr: string = "BOOP";
   public constructor(name: string = "boop") {
      super(name);
   }

   public async exec(msg: Message): Promise<void> {
      const mentionedusers: Array<User> = msg.mentions.users.array();
      if (mentionedusers.length === 0) return void msg.channel.send(`*${this.boopstr}S* <@${msg.author.id}>`).catch(this.logger.error);
      if (mentionedusers.length >= maxboopspermessage) return void msg.channel.send(`I can't ${this.boopstr.toLowerCase()} that many people!`).catch(this.logger.error);
      for (const user of mentionedusers) msg.channel.send(`*${this.boopstr}S* <@${user.id}>`).catch(this.logger.error);
   }

   public perms: Array<PermissionFlags | PermissionString> = [];
   public allowdm: boolean = false;
   public allowguild: boolean = true;
   public category: CategoryAndDataStuff<"fun"> = categories.fun;
   public description: string = "tell me to boop others and yourself!";
   public showinhelp: boolean = true;
}
