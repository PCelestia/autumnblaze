"use strict";

module.exports = (message, autumnblaze) => {
   // strip out the prefix, and process it
   const sentcmd = message.content.substring(autumnblaze.opts.prefix.length);

   for (const cmd in autumnblaze.commands) {
      if (sentcmd === cmd) {

         // exactly the command, no args
         const response = autumnblaze.commands[cmd]("");
         Promise.resolve(response).then(val => {
            if ((val !== undefined) || (val !== "")) message.channel.send(val);
         }).catch(err => {
            console.log("err processing cmd " + cmd);
            console.log(err);
         });
         return;
      }
      if (sentcmd.substring(0, cmd.length + 1) === (cmd + " ")) {

         // has space between cmd and args lol
         // this caused me so much issues lol
         const response = autumnblaze.commands[cmd](sentcmd.substring(cmd.length + 1));
         Promise.resolve(response).then(val => {
            if ((val !== undefined) || (val !== "")) message.channel.send(val);
         }).catch(err => {
            console.log("err processing cmd " + cmd);
            console.log(err);
         });
         return;
      }

   }
};
