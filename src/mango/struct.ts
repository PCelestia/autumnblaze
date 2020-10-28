import { JsonConvert, JsonObject, JsonProperty } from "json2typescript";

export interface GuildLike {
   id: string;
}

export interface UserLike {
   id: string;
}

// how to do optional property!!
// @JsonProperty("yeet", String, true)
// ------------------------------^
// that thing

@JsonObject("guildconfig") export class GuildConfig {
   public static jsonconverter: JsonConvert = new JsonConvert();
   @JsonProperty("name", String) public name: string = "guildsettings";
   @JsonProperty("prefix", String, true) public prefix: string = "";

   public tojson(jsonconverter?: JsonConvert): string {
      return JSON.stringify((jsonconverter ?? GuildConfig.jsonconverter).serializeObject(this));
   }
}
