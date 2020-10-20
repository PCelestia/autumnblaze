import { Message, PermissionFlags, PermissionString, User } from "discord.js";
import { maxboopspermessage } from "../../../consts";
import { categories, CategoryAndDataStuff, Command } from "../_command";

export class BoopersSchmoopers extends Command {
   protected readonly boopstr: string = "BOOP";
   public constructor(name: string = "boop") {
      super(name);
   }

   public async exec(msg: Message): Promise<void> {
      const mentionedusers: Array<User> = msg.mentions.users.array();
      if (mentionedusers.length === 0) return void msg.channel.send(`*${this.boopstr}S* <@${msg.author.id}>`).catch(e => this.logger.warn(e));
      if (mentionedusers.length >= maxboopspermessage) return void msg.channel.send(`I can't ${this.boopstr.toLowerCase()} that many people!`).catch(e => this.logger.warn(e));
      for (const user of mentionedusers) msg.channel.send(`*${this.boopstr}S* <@${user.id}>`).catch(e => this.logger.warn(e));
   }

   public readonly perms: Array<PermissionFlags | PermissionString> = [];
   public readonly allowdm: boolean = false;
   public readonly allowguild: boolean = true;
   public readonly category: CategoryAndDataStuff<"fun"> = categories.fun;
   public readonly description: string = "tell me to boop others and yourself!";
   public readonly showinhelp: boolean = true;
}
