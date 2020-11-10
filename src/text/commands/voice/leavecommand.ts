import { Message } from "discord.js";
import { AutumnBlaze } from "../../../bot";
import { categories, Command } from "../command";

/**
 * tells the bot to leave a voice channel that it is in, it leaves the channel
 * that it is connected to in the guild of the sent message
 *
 * does that makes sense lol? i think that made some sense
 */
export class LeaveCommand extends Command {
   /** {@link AutumnBlaze} that instantiated this */
   private readonly autumnblaze: AutumnBlaze;

   /** construct leave command */
   public constructor(autumnblaze: AutumnBlaze) {
      super("leave");
      this.autumnblaze = autumnblaze;
      this.allowguild = this.autumnblaze.botoptions.enablevoice ?? false;
   }

   public async exec(msg: Message): Promise<void> {
      if (!this.autumnblaze.voicebroadcastmanager) return void msg.channel.send("voice is not enabled!");
      if (!msg.guild) return void this.logger.emerg("Holy HECK this leave command message doesn't have a guild! but it supposedly can only run in a guild! INITIATE PANIC MODE!!!!!");
      if (this.autumnblaze.bot.voice?.connections.has(msg.guild.id)) {
         this.autumnblaze.bot.voice.connections.get(msg.guild.id)?.disconnect();
         this.autumnblaze.voicebroadcastmanager.closebroadcast();
         msg.channel.send("disconnected!").catch(e => this.logger.warn(e));
      } else msg.channel.send("i'm not in a voice channel, silly!").catch(e => this.logger.warn(e));
   }

   public readonly allowdm = false;
   public readonly allowguild;
   public readonly category = categories.voice;
   public readonly description = "tell me to leave after you're done";
   public readonly perms = [];
   public readonly showinhelp = true;
}
