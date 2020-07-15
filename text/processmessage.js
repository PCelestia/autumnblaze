"use strict";

module.exports = (message, autumnblaze) => {
   if ((message.content === "h") && ((autumnblaze.h + autumnblaze.hcooldown) < Date.now())) {
      // h (idea) by Thorinair on A State of Sugar Discord server
      // github username: thorinair
      // (temporary) sloppy reimplementation by me lol
      autumnblaze.h = Date.now();
      message.channel.send("h");
   }

   // process the message for commands
   autumnblaze.commands._process(message, autumnblaze);
};
