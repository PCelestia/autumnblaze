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
      this.autumnblaze.registerreplier(msg.channel.id, her);
   }

   public readonly perms = [];
   public readonly allowdm = false;
   public readonly allowguild = true;
   public readonly category = categories.test;
   public readonly description = "test command lol";
   public readonly showinhelp = false;
}

function* her(): Generator<void, void, Message> {
   let msg = yield;
   while (msg.content === "h") {
      void msg.channel.send("h");
      msg = yield;
   }
   return;
}
