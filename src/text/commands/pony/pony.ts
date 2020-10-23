import { Message, MessageEmbed, PermissionFlags, PermissionString } from "discord.js";
import { JsonConvert, JsonObject, JsonProperty } from "json2typescript";
import { get } from "superagent";
import { colours } from "../../../consts";
import { packagejson, randfromarray } from "../../../rando";
import { categories, CategoryAndDataStuff, Command } from "../_command";

@JsonObject("ponyrepresentations") export class PonyRepresentation {
   @JsonProperty("full") public full: string = "";
   @JsonProperty("tall") public tail: string = "";
   @JsonProperty("large") public large: string = "";
   @JsonProperty("medium") public medium: string = "";
   @JsonProperty("small") public small: string = "";
   @JsonProperty("thumb") public thumb: string = "";
   @JsonProperty("thumbSmall") public thumbsmall: string = "";
   @JsonProperty("thumbTiny") public thumbtiny: string = "";
}

@JsonObject("pony") export class Pony {
   @JsonProperty("id", Number) public id: number = -1;
   @JsonProperty("derpiId", Number, true) public derpiid: number = -1;
   @JsonProperty("tags", [String]) public tags: Array<string> = [];
   @JsonProperty("sourceURL", String, true) public source: string = "unknown";

   @JsonProperty("height", Number) public height: number = 0;
   @JsonProperty("width", Number) public width: number = 0;
   @JsonProperty("aspectRatio", Number) public aspectratio: number = 0;
   @JsonProperty("mimeType", String) public mimetype: string = "";
   @JsonProperty("originalFormat", String) public originalformat: string = "";
   @JsonProperty("representations", PonyRepresentation) public representations: PonyRepresentation = new PonyRepresentation();
}

@JsonObject("randomponyres") export class RandomPonyResult {
   @JsonProperty("pony", Pony) public pony: Pony = new Pony();
}

export class PonyCmd extends Command {
   private readonly jsonconvert: JsonConvert = new JsonConvert();

   public constructor() {
      super("pony");
   }

   public async exec(msg: Message): Promise<void> {
      const pony: Pony = this.jsonconvert.deserializeObject(JSON.parse((await get("https://theponyapi.com/api/v1/pony/random")).text), RandomPonyResult).pony;
      console.log(pony.representations.full);
      console.log(pony.derpiid);

      const embed: MessageEmbed = new MessageEmbed();
      embed.setTitle("Random Pony Image");
      embed.setFooter("autumnblaze v" + packagejson.version);
      embed.setColor(randfromarray(colours)[0]);

      const artisttags: Array<string> = [];
      pony.tags.forEach(tag => {
         tag = tag.toLowerCase();
         if (tag.startsWith("artist:")) artisttags.push(tag);
      });
      if (artisttags.length === 0) embed.addField("artist tags", "no artist tags found :c", true);
      else embed.addField("artist tags", artisttags.join(", "), true);

      embed.addField("tags", pony.tags.join(", "), true);
      embed.addField("source", pony.source, true);
      embed.setImage(pony.representations.large);

      void msg.channel.send(embed);
   }

   public readonly allowdm: boolean = true;
   public readonly allowguild: boolean = true;
   public readonly category: CategoryAndDataStuff<"pony"> = categories.pony;
   public readonly description: string = "get a random pony image!";
   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];
   public readonly showinhelp: boolean = true;
}
