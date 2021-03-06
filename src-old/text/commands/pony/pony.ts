import { Message, MessageEmbed } from "discord.js";
import { JsonConvert, JsonObject, JsonProperty } from "json2typescript";
import { get } from "superagent";
import { AutumnBlaze } from "../../../bot";
import { getembed } from "../../../rando";
import { categories, Command } from "../command";

/** representations of a pony image (different links to different urls) */
@JsonObject("ponyrepresentations") export class PonyRepresentation {
   /** link to a full image */
   @JsonProperty("full") public full: string = "";
   /** link to a tail image */
   @JsonProperty("tall") public tail: string = "";
   /** link to a large image */
   @JsonProperty("large") public large: string = "";
   /** link to a medium image */
   @JsonProperty("medium") public medium: string = "";
   /** link to a small image */
   @JsonProperty("small") public small: string = "";
   /** link to a thumb image */
   @JsonProperty("thumb") public thumb: string = "";
   /** link to a thumbsmall image */
   @JsonProperty("thumbSmall") public thumbsmall: string = "";
   /** link to a thumbtiny image */
   @JsonProperty("thumbTiny") public thumbtiny: string = "";
}

/** pony as gotten from [the pony api](https://theponyapi.com/) */
@JsonObject("pony") export class Pony {
   /** id of the image, 53 bit int */
   @JsonProperty("id", Number) public id: number = -1;
   /** derpibooru id of the image, -1 if unknown */
   @JsonProperty("derpiId", Number, true) public derpiid: number = -1;
   /** an array of tags associated with the image, artist tags included */
   @JsonProperty("tags", [String]) public tags: Array<string> = [];
   /** source url of the image, "unknown" if unknown (duh lol) */
   @JsonProperty("sourceURL", String, true) public source: string = "unknown";

   /** height of original image, in pixels */
   @JsonProperty("height", Number) public height: number = 0;
   /** width of original image, in pixels */
   @JsonProperty("width", Number) public width: number = 0;
   /** aspect ratio of image, width divided by height */
   @JsonProperty("aspectRatio", Number) public aspectratio: number = 0;
   /** The mime-type of the image; generally one of "image/jpeg", "image/png" or "image/gif" */
   @JsonProperty("mimeType", String) public mimetype: string = "";
   /** The original extension of the image; generally one of "jpg", "png" or "gif" */
   @JsonProperty("originalFormat", String) public originalformat: string = "";
   /** representations of the image, see {@link PonyRepresentation} */
   @JsonProperty("representations", PonyRepresentation) public representations: PonyRepresentation = new PonyRepresentation();
}

/** skinnied down {@link PonyRepresentation} to save storage space when sent to a db */
@JsonObject("miniponyrepresentations") export class SmolPoneRepresentations {
   /** link to a full image */
   @JsonProperty("full") public full: string = "";
}

/** skinnied down {@link Pony} to save storage space when sent to a db */
@JsonObject("minipony") export class SmolPone {
   /** id of the image, 53 bit int */
   @JsonProperty("id", Number) public id: number = -1;
   /** derpibooru id of the image, -1 if unknown */
   @JsonProperty("derpiId", Number, true) public derpiid: number = -1;
   /** an array of tags associated with the image, artist tags included */
   @JsonProperty("tags", [String]) public tags: Array<string> = [];
   /** source url of the image, "unknown" if unknown (duh lol) */
   @JsonProperty("sourceURL", String, true) public source: string = "unknown";
   /** representations of the image, see {@link SmolPoneRepresentations} */
   @JsonProperty("representations", SmolPoneRepresentations) public representations: SmolPoneRepresentations = new SmolPoneRepresentations();
}

/** the result of calling `/api/v1/pony/random` on [the pony api](https://theponyapi.com/) */
@JsonObject("randomponyres") export class RandomPonyResult {
   @JsonProperty("pony", Pony) public pony: Pony = new Pony();
}

/** same as {@link RandomPonyResult}, except using the slimmed down classes */
@JsonObject("randomponyresmini") export class RandomSmolPoneResult {
   @JsonProperty("pony", SmolPone) public pony: SmolPone = new SmolPone();
}

/** command for fetching a random pony from [the pony api](https://theponyapi.com/) */
export class PonyCmd extends Command {
   /** autumnblaze instance that instantiated this */
   private readonly autumnblaze: AutumnBlaze;
   /** json converter to use */
   private readonly jsonconvert: JsonConvert = new JsonConvert();

   /** construct le Pony command */
   public constructor(autumnblaze: AutumnBlaze) {
      super("pony");
      this.autumnblaze = autumnblaze;
   }

   public async exec(msg: Message): Promise<void> {
      const result = await get("https://theponyapi.com/api/v1/pony/random");
      const pony: Pony = this.jsonconvert.deserializeObject(JSON.parse(result.text), RandomPonyResult).pony;
      // this.logger.debug(pony.representations.full);
      // this.logger.debug(pony.derpiid);

      const embed: MessageEmbed = getembed();
      embed.setTitle("Random Pony Image");

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

      await msg.channel.send(embed);
      await this.autumnblaze.mango.putpony(this.jsonconvert.deserializeObject(JSON.parse(result.text), RandomSmolPoneResult).pony);
   }

   public readonly allowdm = true;
   public readonly allowguild = true;
   public readonly category= categories.pony;
   public readonly description = "get a random pony image!";
   public readonly showinhelp = true;
}
