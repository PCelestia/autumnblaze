"use strict";

module.exports = msg => {
   // msg is discordjs msg object
   // rv[0] = if pinged
   // if true, then rv[1] = whether or not its only the pingstring
   const pingstring = "<@!" + msg.client.user.id + ">";
   if (msg.content.includes(pingstring)) return [true, msg.content === pingstring];
   return [false];
};
