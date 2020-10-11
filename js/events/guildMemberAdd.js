"use strict";

module.exports = autumnblaze => member => {
   autumnblaze.mango.promise.getservconfig(autumnblaze.db, member.guild).then(servconfig => {
      if (servconfig.welcomechannel) autumnblaze.bot.channels.fetch(servconfig.welcomechannel).then(channel => channel.send("Welcome <@" + member.id + ">!"));
   }).catch(console.warn);
};
