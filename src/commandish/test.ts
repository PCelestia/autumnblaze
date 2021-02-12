import { Commandish } from ".";

export const testcommandish: Commandish = () => async msg =>
   void await msg.channel.send(msg.content);
