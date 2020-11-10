import { Collection, Message, MessageEmbed, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { categories, CategoryAndDataStuff, CategoryNames, Command } from "./command";

/** help command */
export class HelpCommandthing extends Command {
   /** autumnblaze that instantiated this */
   private readonly autumnblaze: AutumnBlaze;
   /**
    * premade top embed because that doesn't change and can be cached
    * (might not be cached anymore later since it can change based on dm/guild
    * i think)
    */
   private helpembed: MessageEmbed | undefined = undefined;

   /** construct zee help command */
   public constructor(autumnblaze: AutumnBlaze) {
      super("help");
      this.autumnblaze = autumnblaze;
   }

   public async exec(msg: Message): Promise<void> {
      // if theres already one, send it, if not, create one and save it
      if (this.helpembed !== undefined) return void msg.channel.send(this.helpembed).catch(e => this.logger.warn(e));
      this.helpembed = this.makeembed();
      msg.channel.send(this.helpembed).catch(e => this.logger.warn(e));
   }

   /** make a top level help embed */
   private makeembed(): MessageEmbed {
      //                                                                                                                                                                    long noodle
      const commandcollection: Collection<CategoryNames, Array<Command>> = new Collection<CategoryNames, Array<Command>>();
      const embed: MessageEmbed = new MessageEmbed();

      // sorteth through everything and yea
      this.autumnblaze.getcommands().forEach(cmd => {
         this.logger.debug(cmd.name);

         let thearr: Array<Command> | undefined = commandcollection.get(cmd.category.name);
         if (thearr === undefined) {
            commandcollection.set(cmd.category.name, []);
            thearr = commandcollection.get(cmd.category.name);
         }
         if (thearr === undefined) {
            return this.logger.emerg("something went wrong in the making of the embed");
         }

         thearr.push(cmd);
      });

      commandcollection.array().sort((a, b) => {
         if (a[0].category.name > b[0].category.name) return 1;
         if (a[0].category.name === b[0].category.name) return 0;
         return -1;
      }).forEach(arr => {
         // arr[0].category.name
         embed.addField(arr[0].category.name, arr[0].category.description);
      });

      // debug reasons, should probably remove before committing
      // but if you see this, hi! i obviously forgot
      commandcollection.array().sort((a, b) => {
         if (a[0].category.name > b[0].category.name) return 1;
         if (a[0].category.name === b[0].category.name) return 0;
         return -1;
      }).forEach(arr => {
         arr.forEach(cmdinarr => {
            this.logger.debug(`${cmdinarr.name}: in category ${cmdinarr.category.name}`);
         });
      });

      return embed;
   }

   public perms = [];
   public allowdm = true;
   public allowguild = true;
   public category = categories.other;
   public description = "this command shows help obviously lol";
   public showinhelp = true;
}
