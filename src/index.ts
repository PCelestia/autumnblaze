/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
// ok eslint now SHUSH

import { AutumnBlaze } from "./bot";
import { envisdev } from "./rando";
import { HelpCommandthing } from "./text/commands/help";
import { JoinCommand } from "./text/commands/voice/joincommand";
import { LeaveCommand } from "./text/commands/voice/leavecommand";
import { NOWPlayInglol } from "./text/commands/voice/nowplaying";
import { PonyCmd } from "./text/commands/pony/pony";
import { Boop, Boopeth, Bap, Bapeth, Hug, Hugeth, Mlem, Mlemeth, Yeeeet, Yeeeetus } from "./text/commands/violations";

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

   autumnblazebotthing.registercommand(new Boop());
   autumnblazebotthing.registercommand(new Boopeth());
   autumnblazebotthing.registercommand(new Bap());
   autumnblazebotthing.registercommand(new Bapeth());
   autumnblazebotthing.registercommand(new Hug());
   autumnblazebotthing.registercommand(new Hugeth());
   autumnblazebotthing.registercommand(new Mlem());
   autumnblazebotthing.registercommand(new Mlemeth());
   autumnblazebotthing.registercommand(new Yeeeet());
   autumnblazebotthing.registercommand(new Yeeeetus());

   autumnblazebotthing.registercommand(new PonyCmd());

   autumnblazebotthing.registercommand(new JoinCommand(autumnblazebotthing));
   autumnblazebotthing.registercommand(new LeaveCommand(autumnblazebotthing));
   autumnblazebotthing.registercommand(new NOWPlayInglol(autumnblazebotthing));

   void autumnblazebotthing.start();
})();
