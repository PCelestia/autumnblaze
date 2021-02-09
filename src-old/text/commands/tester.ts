import { Message } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { categories, Command } from "./command";


function* her(): Generator<void, void, Message> {
   let msg = yield;
   while (msg.content === "h") {
      void msg.channel.send("h");
      msg = yield;
   }
   return;
}

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
      this.autumnblaze.registerreplier(msg.channel.id, her);
   }

   public readonly allowguild = true;
   public readonly category = categories.test;
   public readonly description = "test command lol";
}
