"use strict";

const thecmd = async (arg, msg, autumnblaze, dm, config) => {
   if (dm) return "something went wrong, DM Autumn Blaze#2864 about it";

   if (arg === "") return "please specify what to disable";
   arg = arg.split(/ +/);
   // remove duplicates
   arg = [...new Set(arg)];
   let enabled = [];
   const disabled = [];
   const notchanged = [];

   let rv = "";
   if (!config.enabled) {
      if (arg.length === 1) return "module " + arg[0] + " already disabled";
      return "modules " + arg.join(", ") + " already disabled";
   }
   enabled = config.enabled;
   arg.forEach(e => {
      if (enabled.includes(e)) {
         enabled.splice(enabled.indexOf(e), 1);
         disabled.push(e);
      } else notchanged.push(e);
   });
   if (disabled.length > 0) {
      if (enabled.length === 1) rv = "module " + disabled[0] + " has been disabled" ;
      else rv = "modules " + disabled.join(", ") + " have been disabled";
   }
   if (notchanged.length > 0) {
      if (rv !== "") rv = rv + "\n";

      if (notchanged.length === 1) rv = rv + "module " + notchanged[0] + " already disabled";
      else rv = rv + "modules " + notchanged.join(", ") + " already disabled";
   }
   await autumnblaze.mango.promise.updateservconfig(autumnblaze.db, msg.guild, { enabled: enabled });
   return rv;
};

thecmd.allowguild = true;
thecmd.perms = ["MANAGE_GUILD"];
thecmd.showinhelp = true;
thecmd.description = "disable a module, to enable use the `enable` command";
thecmd.category = "utility";
thecmd.usetyping = true;

module.exports = thecmd;
