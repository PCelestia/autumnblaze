import { JsonObject, JsonProperty } from "json2typescript";

export interface GuildLike {
   id: string;
}

export interface UserLike {
   id: string;
}

// how to do optional property!!
// @JsonProperty("yeet", String, true)
@JsonObject export class GuildConfig {
   @JsonProperty("name", String) public name: string = "";

}
