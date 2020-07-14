"use strict";

module.exports = (message, autumnblaze) => {
   if ((message.content === "h") && ((autumnblaze.h + autumnblaze.hcooldown) < Date.now())) {
      // h (idea) by Thorinair on A State of Sugar Discord server
      // sloppy reimplementation by me lol
      autumnblaze.h = Date.now();
      message.channel.send("h");
   }
   if (message.content === "lalalaa") {
      const config = autumnblaze.mango.getservconfig(autumnblaze.db, message.guild, console.log, {
         name: "guildsettings",
         testproperty: "lol"
      });
   }
   // if cant find nsfw, its dm, reply with "dms off'D"
   // BUT only if the author isn't the bot lol
   if (!(message.nsfw === undefined) && (message.author != autumnblaze.bot.user)) {
      // dm!
      message.channel.send("direct messages don't do anything (yet lol)");
   }

   // if no prefix, get out
   if (!(message.content.substring(0, autumnblaze.opts.prefix.length) === autumnblaze.opts.prefix)) return;

   autumnblaze.commands._process(message, autumnblaze);
};
