"use strict";

module.exports = async (message, autumnblaze) => {
   // ignore thyself
   if (message.author === autumnblaze.bot.user) return;
   // ignore webhooks
   if (message.webhookID) return;

   if ((message.content === "h") && ((autumnblaze.h + autumnblaze.hcooldown) < Date.now())) {
      // h (idea) by Thorinair on A State of Sugar Discord server
      // github username: thorinair
      // (temporary) sloppy reimplementation by me lol
      message.channel.startTyping();
      autumnblaze.h = Date.now();
      message.channel.send("h");
      message.channel.stopTyping();
      return;
   }

   let config;
   if (!(message.channel.type === "dm")) {
      // (try to) remove prefix if guild
      config = await new Promise((resolve, reject) => {
         autumnblaze.mango.getservconfig(autumnblaze.db, message.guild, config => {
            if (config === undefined) return reject("failed to create/get server config");
            if (config.prefix === undefined) config.prefix = autumnblaze.opts.prefix;
            resolve(config);
         });
      });
      if (autumnblaze.randutils.botpinged(message)[0]) {
         let pingstring = "i see i've been pinged\n";
         pingstring = pingstring + "my prefix here is `" + config.prefix + "`, for example `" + config.prefix + "help`";
         message.channel.send(pingstring);
      }
   } else {
      config = await new Promise((resolve, reject) => {
         autumnblaze.mango.getuserconfig(autumnblaze.db, message.author, config => {
            if (config === undefined) return reject("failed to create/get user config");
            resolve(config);
         });
      });
   }

   // process the message for commands
   autumnblaze.commands._process(message, config, autumnblaze);
   autumnblaze.automatedactions._run(message, config, autumnblaze);
};
