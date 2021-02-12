import { Autumn, Logger } from "../bot";
import { Message } from "discord.js";

type CommandOpts = {
   autumn: Autumn;
   stdout: Logger;
   stderr: Logger;
};

export type CmdRaw = (args: string, msg: Message) => Promise<void>;

export type Command = (opts: CommandOpts) => {
   name: string;
   cmd: CmdRaw;
};
