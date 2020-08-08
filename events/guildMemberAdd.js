"use strict";

module.exports = autumnblaze => {
   return async member => {
      const servconfig = await autumnblaze.mango.promise.getservconfig(autumnblaze.db, member.guild);
      if (servconfig.enabledmodules) if (servconfig.enabledmodules.includes("memberjoin")) {
         if (!servconfig.welcomechannel) member.guild.owner.send("Hello! The module \"welcomechannel\" appears to be enabled for the server **" + member.guild.name + "**, but you haven't set a channel to send the welcome messages to.\nSince there is currently no mechanism to set this, you should dm <@" + autumnblaze.opts.ownerid + "> to help you enable it, or you can run `" + (servconfig.prefix || autumnblaze.opts.prefix) + "disable memberjoin` to disable this module.").catch(console.warn);
         else autumnblaze.bot.channels.fetch(servconfig.welcomechannel).then(channel => channel.send("Welcome <@" + member.id + ">!")).catch(console.warn);
      }
   };
};
