import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../../bot";
import { categories, CategoryAndDataStuff, Command } from "../command";

/** gets the song that is currently playing in the radio thing */
export class NOWPlayInglol extends Command {
   private readonly autumnblaze: AutumnBlaze;

   public constructor(autumnblaze: AutumnBlaze) {
      super("nowplaying");
      this.autumnblaze = autumnblaze;
      this.allowguild = this.autumnblaze.botoptions.enablevoice ?? false;
   }

   public async exec(msg: Message): Promise<void> {
      if (!this.autumnblaze.voicebroadcastmanager) return void await msg.channel.send("voice is not enabled!");
      if (!this.autumnblaze.voicebroadcastmanager.nowplaying) return void await msg.channel.send("not playing anything right now!");
      await msg.channel.send(`Now playing: ${this.autumnblaze.voicebroadcastmanager.nowplaying.details.name}\n<${this.autumnblaze.voicebroadcastmanager.nowplaying.details.link}>`);
   }

   public allowdm = false;
   public allowguild;
   public category = categories.voice;
   public description = "Ask me what the now playing song in the radio is";
   public perms = [];
   public showinhelp = true;
}
