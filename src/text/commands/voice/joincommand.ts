import { Message, PermissionFlags, PermissionString } from "discord.js";
import { AutumnBlaze } from "../../../bot";
import { yeet } from "../../../rando";
import { categories, CategoryAndDataStuff, Command } from "../_command";

export class JoinCommand extends Command {
   private readonly autumnblaze: AutumnBlaze;

   public constructor(autumnblaze: AutumnBlaze) {
      super("join");
      this.autumnblaze = autumnblaze;
      this.allowguild = this.autumnblaze.botoptions?.enablevoice ?? false;
   }
   public async exec(msg: Message): Promise<void> {
      if (!this.autumnblaze.voicebroadcastmanager) return void msg.channel.send("voice is not enabled!");
      if (msg.member?.voice.channel) msg.member.voice.channel.join().then(con => {
         if (!this.autumnblaze.voicebroadcastmanager) {
            this.logger.emerg("hmmmmmmm this.autumnblaze.voicebroadcastmanager is undefined");
            this.logger.emerg("but it passed the first check, wasnt modified then failed the same check hmmmmmmmmmmmmm");
            this.logger.emerg("big h");
            this.logger.emerg("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
            this.logger.emerg("h");
            this.logger.emerg("this went horribly wrong if this happened so");
            this.logger.emerg("yah");
            this.logger.emerg("spam errors in the logz");
            this.logger.emerg("this should never happen btw");
            this.logger.emerg("never ever ever ever ever ever ever ever ever ever ever");
            this.logger.emerg(new Error());
            return void msg.channel.send("voice is not enabled!");
         }
         con.play(this.autumnblaze.voicebroadcastmanager.getbroadcast());
      }).catch(err => {
         void msg.channel.send("I couldn't join this voice channel, sorry!");
         yeet(err);
      }).catch(this.logger.warn);
      else msg.channel.send("you need to join a voice channel first!").catch(this.logger.warn);
   }

   public readonly allowdm: boolean = false;
   public readonly allowguild: boolean;
   public readonly category: CategoryAndDataStuff<"voice"> = categories.voice;
   public readonly description: string = "tell me to join your channel and play some tunes!";
   public readonly perms: ReadonlyArray<PermissionFlags | PermissionString> = [];
   public readonly showinhelp: boolean = true;
}