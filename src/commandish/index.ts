import { Autumn, Logger } from "../bot";
import { Message } from "discord.js";

type CommandishOpts = {
   autumn: Autumn;
   stdout: Logger;
   stderr: Logger;
};

export type Commandish = (opts: CommandishOpts) => (msg: Message) => Promise<void> | Promise<false>;
