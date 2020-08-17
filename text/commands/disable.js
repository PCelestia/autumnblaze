"use strict";

const thecmd = {};
thecmd.exec = async (arg, msg, autumnblaze, dm, config) => {
   // return "disabled for the time being~";
   if (dm) throw {
      send: true,
      content: "something went wrong, DM Autumn Blaze#2864 about it"
   };

   if (arg === "") return "please specify what to disable";
   arg = arg.toLowerCase().split(/ +/);
   // remove duplicates
   arg = [...new Set(arg)];
   let enabled = [];
   const disabled = [];
   const notchanged = [];
   const doesntexist = [];

   let rv = "";
   if (!config.enabledmodules) {
      if (arg.length === 1) return "module " + arg[0] + " already disabled";
      return "modules " + arg.join(", ") + " already disabled";
   }
   enabled = config.enabledmodules;
   arg.filter(e => !e.startsWith("_")).forEach(e => {
      if (!autumnblaze.modules[e]) return doesntexist.push(e);
      if (enabled.includes(e)) {
         enabled.splice(enabled.indexOf(e), 1);
         disabled.push(e);
      } else notchanged.push(e);
   });
   if (doesntexist.length > 0) {
      if (doesntexist.length === 1) rv = "module " + doesntexist[0] + " doesn't exist";
      else rv = "modules " + doesntexist.join(", ") + " don't exist";
   }
   if (disabled.length > 0) {
      if (rv !== "") rv = rv + "\n";

      if (disabled.length === 1) rv = rv + "module " + disabled[0] + " has been disabled" ;
      else rv = rv + "modules " + disabled.join(", ") + " have been disabled";
   }
   if (notchanged.length > 0) {
      if (rv !== "") rv = rv + "\n";

      if (notchanged.length === 1) rv = rv + "module " + notchanged[0] + " already disabled";
      else rv = rv + "modules " + notchanged.join(", ") + " already disabled";
   }
   await autumnblaze.mango.promise.updateservconfig(autumnblaze.db, msg.guild, { enabledmodules: enabled });
   return rv;
};

thecmd.allowguild = true;
thecmd.perms = ["MANAGE_GUILD"];
thecmd.showinhelp = true;
thecmd.description = "disable a module, to enable use the `enable` command";
thecmd.category = "utility";
thecmd.usetyping = true;

module.exports = thecmd;
