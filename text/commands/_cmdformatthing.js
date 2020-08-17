"use strict";

// this a template thing to document the command export format thing
const thecmd = async (arg, msg, autumnblaze, dm, config) => {
   // arg           message.contents with prefix chopped off (if applicable) and top level command chopped off. if no args, is ""
   // msg           the discord.message object
   // autumnblaze   the standard massive includes-all autumnblaze object lol
   // dm            whether or not the message is sent in a dm, true if sent in dm
   // config        if dm, user config; if not dm, server config
   if (!dm) return "not quite a command lol";
   else throw {
      // throw object with this format to be able to send "content" property as response to discord
      // send     whether or not to send the error message to the user, boolean
      // content  the content of the error messasge
      send: true,
      content: "not quite a command lol",
      logcontent: "content to put in the console.warn"
   };
};

// allowdm     whether or not to allow command usage in a dm
// allowguild  whether or not to allow command usage in a guild "server"
thecmd.allowdm = true;
thecmd.allowguild = true;
// perms: user must have all these permissions to be able to run the command successfully (see randutils/perms)
// obviously guild perms lol
thecmd.perms = ["MANAGE_GUILD", "SEND_MESSAGES"];
// whether or not to show this command in help
// description    the description to provide
// category       which category to put the command in in the help command
thecmd.showinhelp = true;
thecmd.description = "a little thingie that i can reference when making new commands";
thecmd.category = "other";
// usetyping      whether or not the command executes long enough to warrant the use of the typing indicator
thecmd.usetyping = true;
module.exports = thecmd;

// other methods and things can go below
// or wherever, but preferrably below
