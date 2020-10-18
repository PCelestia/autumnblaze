import { Logger } from "winston";
import ytdl from "youtube-dl";
import { AutumnBlaze } from "../bot";
import { getlogger } from "../rando";



// for autojoin, for later when a db is connected
// export class VoiceThing {
//    private readonly autumnblaze: AutumnBlaze;
//    private readonly logger: Logger;
//
//    public constructor(autumblaze: AutumnBlaze) {
//       this.autumnblaze = autumblaze;
//       this.logger = getlogger("_music");
//
//       this.initautojoin();
//    }
//
//    private initautojoin(): void {
//       // this.autumnblaze.bot.on("voiceStateUpdate", (_oldstate, newstate) => {
//       //    this.logger.debug("voicestate update lol");
//       //    // if it was a join then newstate.channel is not null
//       //    newstate.channel
//       // });
//
//       // have manual join for now
//    }
//
//    private dojoin(): void {
//
//    }
//
//    private doleave(): void {
//
//    }
// }
