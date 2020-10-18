import { Collection, Message, MessageEmbed, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { categories, CategoryAndDataStuff, CategoryNames, Command } from "./_command";

export class HelpCommandthing extends Command {
   private readonly autumnblaze: AutumnBlaze;
   private helpembed: MessageEmbed | undefined = undefined;

   public constructor(autumnblaze: AutumnBlaze) {
      super("help");
      this.autumnblaze = autumnblaze;
   }


   /*
   (a, b) => {
      if (a.name > b.name) return 1;
      if (a.name === b.name) return 0;
      return -1;
   }
   */
   public async exec(msg: Message): Promise<void> {
      // if theres already one, send it, if not, create one and save it
      if (this.helpembed !== undefined) return void msg.channel.send(this.helpembed).catch(this.logger.error);
      this.makeembed();
      msg.channel.send(this.helpembed).catch(this.logger.error);
   }

   private makeembed(): void {
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

      this.helpembed = embed;
   }

   public perms: Array<PermissionFlags | PermissionString> = [];
   public allowdm: boolean = true;
   public allowguild: boolean = true;
   public category: CategoryAndDataStuff<"other"> = categories.other;
   public description: string = "this command shows help obviously lol";
   public showinhelp: boolean = true;
}
