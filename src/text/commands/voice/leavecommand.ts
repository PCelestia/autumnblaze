import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../../bot";
import { categories, CategoryAndDataStuff, Command } from "../_command";

export class LeaveCommand extends Command {
   private readonly autumnblaze: AutumnBlaze;

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

   public readonly allowdm: boolean = false;
   public readonly allowguild: boolean;
   // public get allowguild(): boolean {
   //    return process.env.VOICE ? true : false;
   // }
   public readonly category: CategoryAndDataStuff<"voice"> = categories.voice;
   public readonly description: string = "tell me to leave after you're done";
   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];
   public readonly showinhelp: boolean = true;
}
