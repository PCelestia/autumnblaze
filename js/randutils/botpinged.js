"use strict";

module.exports = msg => {
   // msg is discordjs msg object
   // rv[0] = if pinged
   // if true, then rv[1] = whether or not its only the pingstring and rv[2] = whether or not it starts with pingstring
   const pingstring = "<@!" + msg.client.user.id + ">";
   if (msg.content.includes(pingstring)) return [true, msg.content === pingstring, msg.content.startsWith(pingstring)];
   return [false];
};
