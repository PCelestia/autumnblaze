import { Client } from "discord.js";

// poor man's logger because i am poor
export type Logger = (...args: any) => void;

export type Autumn = {
   stop(): void;
};
export type AutumnOpts = Readonly<{
   token: string;
   stdout?: Logger;
   stderr?: Logger;
   events: ReadonlyArray<string>;
}>;

export async function createautumn(opts: AutumnOpts): Promise<Readonly<Autumn>> {
   const bot = new Client();
   const autumn: Autumn = {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      stop() {}
   };

   await bot.login(opts.token);

   /** whether or not the bot is logged in, false if destroyed already */
   let up = true;

   // the stop function below checks if up is true, if it is true than its still
   // logged in, so destroy it
   // if its false, then its destroyed already, so it doesnt run destroy()
   // dont run destroy() twice
   const stop = () => up && (void (opts.stdout ?? console.log)("not up!") ?? void bot.destroy() ?? (up = false));
   autumn.stop = stop;

   opts.events.forEach(event => process.on(event, stop));
   (opts.stdout ?? console.log)("up!");
   return autumn;
}
