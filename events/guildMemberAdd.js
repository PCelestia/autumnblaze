"use strict";

module.exports = autumnblaze => {
   return async member => {
      const servconfig = await autumnblaze.mango.promise.getservconfig(autumnblaze.db, member.guild);
      if (servconfig.welcomechannel) autumnblaze.bot.channels.fetch(servconfig.welcomechannel).then(channel => channel.send("Welcome <@" + member.id + ">!")).catch(console.warn);
   };
};
