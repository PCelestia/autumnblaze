/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
// ok eslint now SHUSH

import { AutumnBlaze } from "./bot";
import { envisdev, getlogger } from "./rando";
import { HelpCommandthing } from "./text/commands/help";
import { JoinCommand } from "./text/commands/voice/joincommand";
import { LeaveCommand } from "./text/commands/voice/leavecommand";
import { NOWPlayInglol } from "./text/commands/voice/nowplaying";
import { PonyCmd } from "./text/commands/pony/pony";
import { getviolations } from "./text/commands/violations";
// import { Stabby } from "./text/commands/stab";

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
   const autumnblazebotthing: AutumnBlaze = new AutumnBlaze({
      token: process.env.TOKEN,
      enablevoice: true,
      prefix: "autumn ",
      mangolink: process.env.MONGODBCONNECTIONSTRING,
      ponymangolink: process.env.PONYDBCONNECTIONSTRING,
      usemangocache: true
   });

   autumnblazebotthing.registerstoplistener("exit");
   autumnblazebotthing.registerstoplistener("SIGINT");
   autumnblazebotthing.registerstoplistener("SIGTERM");

   // test command
   if (envisdev()) autumnblazebotthing.registercommand(new (await import("./text/commands/tester")).Testester(autumnblazebotthing));

   autumnblazebotthing.registercommand(new HelpCommandthing(autumnblazebotthing));

   getviolations().forEach(v => autumnblazebotthing.registercommand(v));
   autumnblazebotthing.registercommand(new PonyCmd(autumnblazebotthing));

   autumnblazebotthing.registercommand(new JoinCommand(autumnblazebotthing));
   autumnblazebotthing.registercommand(new LeaveCommand(autumnblazebotthing));
   autumnblazebotthing.registercommand(new NOWPlayInglol(autumnblazebotthing));

   // autumnblazebotthing.registercommand(new Stabby());

   await autumnblazebotthing.start();

   const logger = getlogger("_main_");
   process.on("unhandledRejection", (reason) => {
      logger.emerg("UNCAUGHT PROMISE REJECTION");
      logger.emerg(`REASON: ${reason}`);
      logger.emerg("PROMISE: WELL FUF I CANT STRINGIFY THIS");
   });
})();
