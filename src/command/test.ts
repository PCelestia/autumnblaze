import { Command } from ".";

export const testcmd: Command = () => ({
   cmd: async (args, msg) => {
      await msg.channel.send("got args " + args);
   },
   name: "test"
});
