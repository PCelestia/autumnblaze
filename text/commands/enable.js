"use strict";

const thecmd = async (arg, msg, autumnblaze, dm, config) => {
   if (dm) return "something went wrong, DM Autumn Blaze#2864 about it";

   if (arg === "") return "please specify what to enable";
   arg = arg.split(/ +/);
   // remove duplicates
   arg = [...new Set(arg)];
   let alreadyenabled = [];
   const enabled = [];
   const notchanged = [];

   let rv = "";
   if (config.enabledmodules) alreadyenabled = config.enabledmodules;
   arg.forEach(e => {
      if (alreadyenabled.includes(e)) notchanged.push(e);
      else {
         alreadyenabled.push(e);
         enabled.push(e);
      }
   });
   if (enabled.length > 0) {
      if (enabled.length === 1) rv = "module " + enabled.join(", ") + " has been enabled" ;
      else rv = "modules " + enabled.join(", ") + " have been enabled";
   }
   if (notchanged.length > 0) {
      if (rv !== "") rv = rv + "\n";

      if (notchanged.length === 1) rv = rv + "module " + notchanged.join(", ") + " already enabled";
      else rv = rv + "modules " + notchanged.join(", ") + " already enabled";
   }
   await autumnblaze.mango.promise.updateservconfig(autumnblaze.db, msg.guild, { enabledmodules: alreadyenabled });
   return rv;
};

thecmd.allowguild = true;
thecmd.perms = ["MANAGE_GUILD"];
thecmd.showinhelp = true;
thecmd.description = "enable a module, to disable use the `disable` command";
thecmd.category = "utility";
thecmd.usetyping = true;

module.exports = thecmd;
