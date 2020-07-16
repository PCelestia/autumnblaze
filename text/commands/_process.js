"use strict";

module.exports = (message, autumnblaze) => {
   // strip out the prefix if not dm, dms cannot use prefix
   let sentcmd = message.content;
   let dm = false;

   // ignore thyself
   if (message.author === autumnblaze.bot.user) return;
   if (message.channel.type === "dm") {
      dm = true;
   } else sentcmd = sentcmd.substring(autumnblaze.opts.prefix.length);

   for (const cmd in autumnblaze.commands) {
      if (sentcmd === cmd) {
         // exactly the command, no args
         const response = autumnblaze.commands[cmd]("");
         Promise.resolve(response).then(val => {
            if ((val !== undefined) && (val !== "")) message.channel.send(val).catch(console.warn);
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
            if ((val !== undefined) && (val !== "")) message.channel.send(val).catch(console.warn);
         }).catch(err => {
            console.log("err processing cmd " + cmd);
            console.log(err);
         });
         return;
      }
   }
   // no command found, if reg channel is ok, if dm then send error
   if (dm) message.channel.send("command not found");
};
