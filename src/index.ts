/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable @typescript-eslint/no-var-requires */
// ok eslint now SHUSH
import { AutumnBlaze } from "./bot";
import { envisdev } from "./rando";
import { BoopersSchmoopers } from "./text/commands/boop";


if (envisdev()) (require("dotenv") as any).config();
if (process.env.TOKEN === undefined) {
   console.error("no token provided!");
   process.exit(1);
}
const autumnblazebotthing: AutumnBlaze = new AutumnBlaze(process.env.TOKEN);

autumnblazebotthing.registerstoplistener("exit");
autumnblazebotthing.registerstoplistener("SIGINT");
autumnblazebotthing.registerstoplistener("SIGTERM");

autumnblazebotthing.registercommand(new BoopersSchmoopers());

void autumnblazebotthing.start();
