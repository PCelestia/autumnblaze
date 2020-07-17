"use strict";

module.exports = (message, autumnblaze) => {
   if ((message.content === "h") && ((autumnblaze.h + autumnblaze.hcooldown) < Date.now())) {
      // h (idea) by Thorinair on A State of Sugar Discord server
      // github username: thorinair
      // (temporary) sloppy reimplementation by me lol
      message.channel.startTyping();
      autumnblaze.h = Date.now();
      message.channel.send("h");
      message.channel.stopTyping();
   }

   // process the message for commands
   autumnblaze.commands._process(message, autumnblaze);
};
