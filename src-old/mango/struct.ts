import { JsonConvert, JsonObject, JsonProperty } from "json2typescript";

/** interface for a guildlike object (msg.guild works for sure) */
export interface GuildLike {
   id: string;
}

/** interface for userlike object (msg.author works for sure) */
export interface UserLike {
   id: string;
}

// how to do optional property!!
// @JsonProperty("yeet", String, true)
// ------------------------------^
// that thing

/** guild (server) configuration object */
@JsonObject("guildconfig") export class GuildConfig {
   /** converter used to convert to/from json and GuildConfig objects */
   public static jsonconverter: JsonConvert = new JsonConvert();
   /** name, which should always be guildsettings */
   @JsonProperty("name", String) public name: string = "guildsettings";
   /** prefix of the server, which is either present or "" meaning default */
   @JsonProperty("prefix", String, true) public prefix: string = "";

   /** convert back to json */
   public tojson(jsonconverter?: JsonConvert): string {
      return JSON.stringify((jsonconverter ?? GuildConfig.jsonconverter).serializeObject(this));
   }
}
