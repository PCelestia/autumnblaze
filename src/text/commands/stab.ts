import { Message } from "discord.js";
import { categories, Command } from "./command";

export class Stabby extends Command {
   public constructor() {
      super("stab");
   }
   public readonly category = categories.other;
   public readonly description = "stab someone... or try to";
   public readonly allowguild = true;

   public async exec(msg: Message): Promise<void> {
      this.logger.info(`${msg.author.username}#${msg.author.discriminator} (${msg.author.id}) want stabby but hehe nop`);
      msg.channel.send("nuuuuuuuuu\n*noms knife instead*").catch(err => this.logger.error(err));
   }
}
