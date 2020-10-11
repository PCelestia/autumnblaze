"use strict";

const thecmd = {};
thecmd.exec = async (arg, msg, autumnblaze, dm, config) => {
   // return "disabled for the time being~";
   if (dm) throw {
      send: true,
      content: "something went wrong, DM Autumn Blaze#2864 about it"
   };

   if (arg === "") return "please specify what to enable";
   arg = arg.toLowerCase().split(/ +/);
   // remove duplicates
   arg = [...new Set(arg)];
   let alreadyenabled = [];
   const enabled = [];
   const notchanged = [];
   const doesntexist = [];

   let rv = "";
   if (config.enabledmodules) alreadyenabled = config.enabledmodules;
   arg.filter(e => !e.startsWith("_")).forEach(e => {
      if (!autumnblaze.modules[e]) return doesntexist.push(e);
      if (alreadyenabled.includes(e)) notchanged.push(e);
      else {
         alreadyenabled.push(e);
         enabled.push(e);
      }
   });
   if (doesntexist.length > 0) {
      if (doesntexist.length === 1) rv = "module " + doesntexist[0] + " doesn't exist";
      else rv = "modules " + doesntexist.join(", ") + " don't exist";
   }
   if (enabled.length > 0) {
      if (rv !== "") rv = rv + "\n";

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
