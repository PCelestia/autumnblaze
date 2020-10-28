import { Message, PermissionFlags, PermissionString, User } from "discord.js";
import { categories, CategoryAndDataStuff, Command } from "./_command";


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

export class Violation extends Command {
   public readonly opts: ViolationOptions;

   public constructor(opts: ViolationOptions) {
      super(opts.name);
      this.opts = opts;
      this.description = opts.description;
   }

   public async exec(msg: Message): Promise<void> {
      const mentionedusers: Array<User> = msg.mentions.users.array();
      if (mentionedusers.length === 0) return void msg.channel.send(`_${this.opts.pluralaction}_ <@${msg.author.id}>`).catch(e => this.logger.warn(e));
      if (mentionedusers.length >= this.opts.maxmentions) return void msg.channel.send(`I can't ${this.opts.name} that many people!`).catch(e => this.logger.warn(e));
      for (const user of mentionedusers) msg.channel.send(`${this.opts.pluralaction} <@${user.id}>`).catch(e => this.logger.warn(e));
   }

   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];
   public readonly allowdm: boolean = false;
   public readonly allowguild: boolean = true;
   public readonly category: CategoryAndDataStuff<"fun"> = categories.fun;
   public readonly description: string;
   public readonly showinhelp: boolean = true;
}

export class Boop extends Violation {
   public constructor() {
      super({
         name: "boop",
         pluralaction: "BOOPS",
         maxmentions: 3,
         description: "tell me to boop people!"
      });
   }
}

export class Boopeth extends Violation {
   public constructor() {
      super({
         name: "boopeth",
         pluralaction: "BOOPETHS",
         maxmentions: 3,
         description: "i BOOPETH you"
      });
   }
}

export class Bap extends Violation {
   public constructor() {
      super({
         name: "bap",
         pluralaction: "BAPS",
         maxmentions: 3,
         description: ":newspaper2: bap!"
      });
   }
}

export class Bapeth extends Violation {
   public constructor() {
      super({
         name: "bapeth",
         pluralaction: "BAPETHS",
         maxmentions: 3,
         // im not good at describing things
         description: "i bapeth you"
      });
   }
}

export class Hug extends Violation {
   public constructor() {
      super({
         name: "hug",
         pluralaction: "HUGS",
         maxmentions: 3,
         description: "huggies!"
      });
   }
}

export class Hugeth extends Violation {
   public constructor() {
      super({
         name: "hugeth",
         pluralaction: "HUGETHS",
         maxmentions: 3,
         // yes im really not good at describing things
         description: "i giv u hugeth"
      });
   }
}

export class Mlem extends Violation {
   public constructor() {
      super({
         name: "mlem",
         pluralaction: "MLEMS",
         maxmentions: 3,
         description: "mlem"
      });
   }
}

export class Mlemeth extends Violation {
   public constructor() {
      super({
         name: "mlemeth",
         pluralaction: "MLEMETHS",
         maxmentions: 3,
         description: "mlemeth (idk how to describe)"
      });
   }
}

export class Yeeeet extends Violation {
   public constructor() {
      super({
         name: "yeet",
         pluralaction: "YEETS",
         maxmentions: 3,
         description: "you can Yeet someone cause why not"
      });
   }
}

export class Yeeeetus extends Violation {
   public constructor() {
      super({
         name: "yeetus",
         pluralaction: "YEETUSES",
         maxmentions: 3,
         description: "Yeetus someone off of a cliff (or smth idk)"
      });
   }
}
