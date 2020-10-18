import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../../bot";
import { yeet } from "../../../rando";
import { categories, CategoryAndDataStuff, Command } from "../_command";

export class JoinCommand extends Command {
   private readonly autumnblaze: AutumnBlaze;

   public constructor(autumnblaze: AutumnBlaze) {
      super("join");
      this.autumnblaze = autumnblaze;
   }
   public async exec(msg: Message): Promise<void> {
      msg.channel.send("testing... i might join idk").catch(this.logger.warn);

      if (msg.member?.voice.channel) msg.member.voice.channel.join().catch(err => {
         void msg.channel.send("I couldn't join this voice channel, sorry!");
         yeet(err);
      }).catch(this.logger.warn);
      else msg.channel.send("you need to join a voice channel first!").catch(this.logger.warn);
   }

   public readonly allowdm: boolean = false;
   public readonly allowguild: boolean = true;
   public readonly category: CategoryAndDataStuff<"voice"> = categories.voice;
   public readonly description: string = "tell me to join your channel and play some tunes!";
   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];
   public readonly showinhelp: boolean = true;
}
