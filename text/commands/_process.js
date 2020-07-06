module.exports = (message, autumnblaze) => {
   // loggie
   console.log(autumnblaze.randutils.logcmdmsg(message));
   // strip out the prefix, and process it
   const sentcmd = message.content.substring(autumnblaze.opts.prefix.length);

   for (const cmd in autumnblaze.commands) if (sentcmd.substring(0, cmd.length + 1) === cmd + " ") {
      let response = autumnblaze.commands[cmd](sentcmd.substring(cmd.length + 1));
      // need to check response for nullness and undefinedness lol
      message.channel.send(response);
      return;
   }
};
