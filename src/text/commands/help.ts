import { Collection, Message, MessageEmbed } from "discord.js";
import { AutumnBlaze } from "../../bot";
import { GuildConfig } from "../../mango/struct";
import { getembed } from "../../rando";
import { categories, CategoryNames, Command } from "./command";

const sep = "__";
function getid(channelid: string, authorid?: string): string {
   return channelid + sep + (authorid ?? "");
}
/** help command */
export class HelpCommandthing extends Command {
   /** autumnblaze that instantiated this */
   private readonly autumnblaze: AutumnBlaze;
   /**
    * premade top embed because that doesn't change and can be cached
    * (might not be cached anymore later since it can change based on dm/guild
    * i think)
    */
   private helpembed?: MessageEmbed = undefined;
   private commandcollection?: Collection<CategoryNames, Array<Command>> = undefined;

   /** construct zee help command */
   public constructor(autumnblaze: AutumnBlaze) {
      super("help");
      this.autumnblaze = autumnblaze;
   }

   public async exec(msg: Message, arg: string, config: GuildConfig): Promise<void> {
      if (arg !== "") {
         await msg.channel.send(this.makespecificembed(arg, msg));
         return;
      }
      // if theres already one, send it, if not, create one and save it
      if (this.helpembed !== undefined) return void msg.channel.send(this.helpembed).catch(e => this.logger.warn(e));
      this.helpembed = this.makeembed(config.prefix !== "" ? config.prefix : this.autumnblaze.botoptions.prefix);
      msg.channel.send(this.helpembed).catch(e => this.logger.warn(e));
   }

   private getcategories(): Collection<CategoryNames, Array<Command>> {
      const commandcollection: Collection<CategoryNames, Array<Command>> = new Collection();

      // sorteth through everything and yea
      this.autumnblaze.getcommands().forEach(cmd => {
         this.logger.debug(cmd.name);

         let thearr: Array<Command> | undefined = commandcollection.get(cmd.category.name);
         if (thearr === undefined) {
            commandcollection.set(cmd.category.name, []);
            thearr = commandcollection.get(cmd.category.name);
         }
         if (thearr === undefined) return this.logger.emerg("something went wrong in getting categories");

         thearr.push(cmd);
      });
      return commandcollection;
   }
   /** make a top level help embed */
   private makeembed(prefix: string = ""): MessageEmbed {
      // maps a category name to an array of commands that fall under that category
      this.commandcollection = this.getcategories();
      const embed: MessageEmbed = getembed();

      embed.setTitle("Command Help");
      embed.setDescription(`run \`${prefix}help <category>\` for help on commands in a category`);
      this.commandcollection.array().sort((a, b) => {
         // idk why this lol
         if (a[0].category.name > b[0].category.name) return 1;
         if (a[0].category.name === b[0].category.name) return 0;
         return -1;
      }).forEach(arr => embed.addField(arr[0].category.name, arr[0].category.description));

      // debug reasons, should probably remove before committing
      // but if you see this, hi! i obviously forgot
      this.commandcollection.array().sort((a, b) => {
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

   private makespecificembed(category: string, msg: Message): MessageEmbed {
      if (!this.commandcollection) this.commandcollection = this.getcategories();
      const embed = getembed();

      // eeehehehehe theres a better way to do this im sure
      // what if i add a category and this doesnt recognise it
      // so this is bad
      if (!(category === "other" ||
            category === "test" ||
            category === "utility" ||
            category === "pony" ||
            category === "fun" ||
            category === "voice")) return embed.setTitle("Category not found");
      const thearr: Array<Command> | undefined = this.commandcollection.get(category);
      if (thearr === undefined){
         // no commands available in that category
         return embed.setTitle("No commands available in that category");
      }

      embed.setTitle(`Command help for category ${category}`);
      embed.setDescription(categories[category].description);
      thearr.forEach(cmd => {
         if ((msg.channel.type === "dm" && cmd.allowdm) || ((msg.channel.type === "news" || msg.channel.type === "text") && cmd.allowguild)) embed.addField(cmd.name, cmd.description, true);
      });
      return embed;
   }

   public readonly allowdm = true;
   public readonly allowguild = true;
   public readonly category = categories.other;
   public readonly description = "this command shows help obviously lol";
   public readonly showinhelp = true;
}
