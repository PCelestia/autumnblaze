module.exports = (message, autumnblaze) => {
   // strip out the prefix, and process it
   const sentcmd = message.content.substring(autumnblaze.opts.prefix.length);

   for (const cmd in autumnblaze.commands) {
      if (sentcmd === cmd) {
         // loggie
         console.log(autumnblaze.randutils.logcmdmsg(message));

         // exactly the command, no args
         const response = autumnblaze.commands[cmd]("");
         if (response) message.channel.send(response);
         return;
      }
      if (sentcmd.substring(0, cmd.length + 1) === (cmd + " ")) {
         // loggie
         console.log(autumnblaze.randutils.logcmdmsg(message));

         // has space between cmd and args lol
         // this caused me so much issues lol
         const response = autumnblaze.commands[cmd](sentcmd.substring(cmd.length + 1));
         if (response) message.channel.send(response);
         return;
      }
   }
   // if here its not a command
   console.log(autumnblaze.randutils.logmsg(message));
};
