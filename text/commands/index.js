// and help
"use strict";

// this file contains the function that processes the commands.
// prefix and top level command has been removed already (only args/subcommands remain):
// if user typed "autumn help", the command that is processed is ""
// "autumn togglerole mc-announcements" becomes "mc-announcements"

// cmds.help = command handler
// cmds.description = command description
// cmds.usage = usage of the command

// return value: string
// rv.dm = boolean (whether or not the response should be sent in dm)

// ------OR--------
// return value: object
// rv.dm = string (message to send in dm)
// rv.guildchannel = string (message to send to channel in guild)

// example: person does "autumn help"
// bot responds with "check your dms"
// bot dms user with the help message

const cmds = {};
cmds._process = require("./_process");
// tmp test cmds
cmds.test1 = require("./test1");
cmds.test2 = require("./test2");
cmds.test3 = require("./test3");
cmds.ping = require("./ping");

// ping (useful thou)
// query
// list
// togglerole

const helpcmd = cmd => {
   if (cmd !== "") {
      let helpstr = "help for command \"" + cmd + "\"";
      if (cmds[cmd] !== undefined) helpstr = helpstr + "\n" + cmds[cmd].description;
      return helpstr;
   }
   let helpstr = "help";
   for (const cmdhandler in cmds) if (cmds[cmdhandler].showinhelp) helpstr = helpstr + "\n**" + cmdhandler + "** - " + cmds[cmdhandler].description;
   helpstr = helpstr + "\n\nhave fun yo";
   return helpstr;
};
helpcmd.description = "";
cmds.help = helpcmd;

module.exports = cmds;
