import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../../bot";
import { categories, CategoryAndDataStuff, Command } from "../_command";

export class LeaveCommand extends Command {
   private readonly autumnblaze: AutumnBlaze;

   public constructor(autumnblaze: AutumnBlaze) {
      super("leave");
      this.autumnblaze = autumnblaze;
   }
   public async exec(msg: Message): Promise<void> {
      msg.channel.send("testing... i might leave idk").catch(this.logger.warn);

      // if (!msg.member?.voice.channelID) return void msg.channel.send("you need to join my voi").catch(this.logger.warn);
      if (!msg.guild) return void this.logger.emerg("Holy HECK this leave command message doesn't have a guild! but it can only run in a guild! INITIATE PANIC MODE!!!!!");
      if (this.autumnblaze.bot.voice?.connections.has(msg.guild.id)) {
         this.autumnblaze.bot.voice.connections.get(msg.guild.id)?.disconnect();
         msg.channel.send("disconnected!").catch(this.logger.warn);
      }
   }

   public readonly allowdm: boolean = false;
   public readonly allowguild: boolean = true;
   public readonly category: CategoryAndDataStuff<"voice"> = categories.voice;
   public readonly description: string = "tell me to leave after you're done";
   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];
   public readonly showinhelp: boolean = true;
}
