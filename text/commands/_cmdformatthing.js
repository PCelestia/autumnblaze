"use strict";
// this a template thing to document the command export format thing
const thecmd = async (arg, msg, autumnblaze, dm, config) => {
   if (!dm) return "not quite a command lol";
   else throw {
      send: true,
      content: "not quite a command lol"
   };
};

thecmd.allowdm = true;
thecmd.allowguild = true;
// perms: see randutils/perms
thecmd.perms = ["MANAGE_GUILD", "SEND_MESSAGES"];
thecmd.showinhelp = true;
thecmd.description = "a little thingie that i can reference when making new commands";
thecmd.category = "other";
module.exports = thecmd;

// other methods and things can go below
