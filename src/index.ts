/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
// ok eslint now SHUSH

import { AutumnBlaze } from "./bot";
import { envisdev } from "./rando";
import { BoopersSchmoopers } from "./text/commands/boopie/boop";
import { Boopethieht } from "./text/commands/boopie/boopeth";
import { HelpCommandthing } from "./text/commands/help";
import { Mlemmer } from "./text/commands/boopie/mlem";
import { JoinCommand } from "./text/commands/voice/joincommand";
import { LeaveCommand } from "./text/commands/voice/leavecommand";
import { NOWPlayInglol } from "./text/commands/voice/nowplaying";
import { Bapper } from "./text/commands/boopie/bap";
import { HaveAtTheeCurrr } from "./text/commands/boopie/bapeth";
import { PonyCmd } from "./text/commands/pony/pony";
import { Yeeter } from "./text/commands/boopie/yeet";
import { Hugger } from "./text/commands/boopie/hug";
import { Yeetusser } from "./text/commands/boopie/yeetus";

void (async function(): Promise<void> {
   if (envisdev()) (require("dotenv") as any).config();
   if (process.env.TOKEN === undefined) {
      console.error("no token provided!");
      process.exit(1);
   }
   if (process.env.MONGODBCONNECTIONSTRING === undefined) {
      console.error("no mongodb connection string provided!");
      process.exit(1);
   }
   const autumnblazebotthing: AutumnBlaze = new AutumnBlaze(process.env.TOKEN, {
      enablevoice: true,
      prefix: "autumn ",
      mangolink: process.env.MONGODBCONNECTIONSTRING,
      ponymangolink: process.env.PONYDBCONNECTIONSTRING,
      usemangocache: true
   });

   autumnblazebotthing.registerstoplistener("exit");
   autumnblazebotthing.registerstoplistener("SIGINT");
   autumnblazebotthing.registerstoplistener("SIGTERM");

   if (envisdev()) autumnblazebotthing.registercommand(new (await import("./text/commands/tester")).Testester(autumnblazebotthing));
   autumnblazebotthing.registercommand(new HelpCommandthing(autumnblazebotthing));
   autumnblazebotthing.registercommand(new BoopersSchmoopers());
   autumnblazebotthing.registercommand(new Boopethieht());
   autumnblazebotthing.registercommand(new Mlemmer());
   autumnblazebotthing.registercommand(new Bapper());
   autumnblazebotthing.registercommand(new HaveAtTheeCurrr());
   autumnblazebotthing.registercommand(new Yeeter());
   autumnblazebotthing.registercommand(new Hugger());
   autumnblazebotthing.registercommand(new Yeetusser());

   autumnblazebotthing.registercommand(new PonyCmd());

   autumnblazebotthing.registercommand(new JoinCommand(autumnblazebotthing));
   autumnblazebotthing.registercommand(new LeaveCommand(autumnblazebotthing));
   autumnblazebotthing.registercommand(new NOWPlayInglol(autumnblazebotthing));

   void autumnblazebotthing.start();
})();
