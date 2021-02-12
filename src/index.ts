import { createautumn } from "./bot";
import { testcmd } from "./command/test";
import { testcommandish } from "./commandish/test";
import { envisdev } from "./rando";

void (async function() {
   if (envisdev()) (await import("dotenv")).config();
   if (!process.env.TOKEN) throw "NO TOKEN IN THE ENV LOL";

   await createautumn({
      token: process.env.TOKEN,
      stdout: console.log,
      stderr: console.error,
      events: ["exit", "SIGINT", "SIGTERM"],
      commandish: [testcommandish],
      command: [testcmd],
      defaultprefix: "autumn "
   });
})().catch(console.error);
