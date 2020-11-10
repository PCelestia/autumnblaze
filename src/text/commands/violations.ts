import { Message, User } from "discord.js";
import { categories, Command } from "./command";

/** maximum mentions per message */
export const maxboopspermessage: number = 3;

/** options for violation */
export interface ViolationOptions {
   /**
    * the name of the command (what word is used in the command, what its called)
    *
    * for example,"autumn help" name is "help", "autumn bapeth" name is "bapeth"
    */
   name: string;
   /** description for this command */
   description: string;
   // /** the name of the command (what word is used in the command, what its called) */
   // pluralname: string;
   // /** the uppercase word thats send to the chat, ex "BOOP" "BAPETH" "YEETUS" */
   // action: string;
   /**
    * the uppercase word thats send to the chat, ex "BOOPS" "BAPETHS" "YEETUSES"
    *
    * Theres a proper term for this that i dont remember what it is, whatever. used like "hugs @person",
    * "baps @person", "yeetuses @person" etc
    */
   pluralaction: string;
   /** maximum number of mentions allowed per message */
   maxmentions: number;
}

/**
 * theres no really good reason why this is called a violation lol,
 * i asked a friend on discord what a category for boop, bap, hug etc
 * commands should be called and they said "violation" so i was like i have
 * no better name so why not lol
 */
export class Violation extends Command {
   /** opts for this one */
   public readonly opts: ViolationOptions;

   /** construct zee */
   public constructor(opts: ViolationOptions) {
      super(opts.name);
      this.opts = opts;
      this.description = opts.description;
   }

   public async exec(msg: Message): Promise<void> {
      const mentionedusers: Array<User> = msg.mentions.users.array();
      if (mentionedusers.length === 0) return void msg.channel.send(`_${this.opts.pluralaction}_ <@${msg.author.id}>`).catch(e => this.logger.warn(e));
      if (mentionedusers.length >= this.opts.maxmentions) return void msg.channel.send(`I can't ${this.opts.name} that many people!`).catch(e => this.logger.warn(e));
      for (const user of mentionedusers) msg.channel.send(`_${this.opts.pluralaction}_ <@${user.id}>`).catch(e => this.logger.warn(e));
   }

   public readonly allowguild = true;
   public readonly category = categories.fun;
   public readonly description;
   public readonly showinhelp = true;
}

export function getviolations(): [Violation, Violation, Violation, Violation, Violation, Violation, Violation, Violation, Violation, Violation] {
   return [
      new Violation({
         name: "boop",
         pluralaction: "BOOPS",
         maxmentions: maxboopspermessage,
         description: "tell me to boop people!"
      }),
      new Violation({
         name: "boopeth",
         pluralaction: "BOOPETHS",
         maxmentions: maxboopspermessage,
         description: "i BOOPETH you"
      }),
      new Violation({
         name: "bap",
         pluralaction: "BAPS",
         maxmentions: maxboopspermessage,
         description: ":newspaper2: bap!"
      }),
      new Violation({
         name: "bapeth",
         pluralaction: "BAPETHS",
         maxmentions: maxboopspermessage,
         // im not good at describing things
         description: "i bapeth you"
      }),
      new Violation({
         name: "hug",
         pluralaction: "HUGS",
         maxmentions: maxboopspermessage,
         description: "huggies!"
      }),
      new Violation({
         name: "hugeth",
         pluralaction: "HUGETHS",
         maxmentions: maxboopspermessage,
         // yes im really not good at describing things
         description: "i giv u hugeth"
      }),
      new Violation({
         name: "mlem",
         pluralaction: "MLEMS",
         maxmentions: maxboopspermessage,
         description: "mlem"
      }),
      new Violation({
         name: "mlemeth",
         pluralaction: "MLEMETHS",
         maxmentions: maxboopspermessage,
         description: "mlemeth (idk how to describe)"
      }),
      new Violation({
         name: "yeet",
         pluralaction: "YEETS",
         maxmentions: maxboopspermessage,
         description: "you can Yeet someone cause why not"
      }),
      new Violation({
         name: "yeetus",
         pluralaction: "YEETUSES",
         maxmentions: maxboopspermessage,
         description: "Yeetus someone off of a cliff (or smth idk)"
      })
   ];
}
