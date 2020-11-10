import { Message, PermissionFlags, PermissionString } from "discord.js";
import { Logger } from "winston";
import { getlogger } from "../../rando";

/**
 * abstract interface providing things common across all commands.
 * a command should extend this for some common functionality
 */
export abstract class Command {
   /** name of the command, also what is used to invoke this command */
   public readonly name: string;
   /** logger of the command (subclasses inherit and can use this) */
   protected readonly logger: Logger;

   /** constructor, subclasses should declare a different
    * (noarg or maybe one that takes an {@link AutumnBlaze})
    * constructor then call super(name)
    */
   public constructor(name: string) {
      this.name = name;
      this.logger = getlogger(this.name);

      this.logger.debug(`${this.name} constructed!`);
   }

   /**
    * called when someone runs this command
    * @param msg message to act on
    * @param args the "args" of this command
    */
   public async abstract exec(msg: Message, args: string): Promise<void>;
   /** permissions required to run this command, empty array if anyone can run it */
   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];

   /** allow this command to be run in DMs */
   public readonly allowdm: boolean = false;
   /** allow this command to be run in a guild (server) */
   public readonly allowguild: boolean = false;

   /** category of this command (yes i maybe overcomplicated this category thing lol) */
   public readonly abstract category: CategoryAndDataStuff<CategoryNames>;
   /** description of this command */
   public readonly abstract description: string | undefined;
   /** whether or not to show this command and information in the help embed */
   public readonly showinhelp: boolean = false;
}

// what
// the
// hecc
// i big brained lol
/** allowed categories */
export type CategoryNames = "other" | "test" | "utility" | "pony" | "fun" | "voice";

/** interface for categorywide stuff like description */
export interface CategoryAndDataStuff<N extends CategoryNames> {
   name: N;
   description: string;
}

/** category info (like descriptions and etc) */
export const categories: Readonly<{ [N in CategoryNames]: CategoryAndDataStuff<N> }> = {
   // i want to remove the duplicated name and key and stuff
   // ehh it doesnt matter too much rn, name is checked to be the same as the key so whatever
   other: {
      name: "other",
      description: "some miscellaneous commands that don't really fit in any other category"
   },
   test: {
      name: "test",
      description: "used to test various functions/things of the bot, usually there is nothing in here"
   },
   utility: {
      name: "utility",
      description: "utility commands"
   },
   pony: {
      name: "pony",
      description: "commands related to ponies"
   },
   fun: {
      name: "fun",
      description: "non-serious things happen here"
   },
   voice: {
      name: "voice",
      description: "voice-channel and music related commands"
   }
};
