"use strict";

const thecmd = {};
thecmd.exec = async (arg, msg, autumnblaze, dm, config) => {
   if (dm) throw {
      send: true,
      content: "something went wrong, DM Autumn Blaze#2864 about it"
   };

   const subcmd = autumnblaze.randutils.getsubcmd(arg);
   if (subcmd[0] === "empty") return "what should I do?";
   if (subcmd[1] === "get") return get(subcmd, config);
   if (subcmd[1] === "set") return await set(autumnblaze, msg, subcmd);
   return "I don't understand that, sorry";
};

thecmd.allowguild = true;
thecmd.perms = ["MANAGE_GUILD"];

thecmd.showinhelp = true;
thecmd.description = "change bot configuration for this guild (ex. prefix, enable/disable things, etc)";
thecmd.category = "utility";
module.exports = thecmd;

const get = (subcmd, config) => {
   if (subcmd[0] === "noarg") return "what should I get?";
   const args = subcmd[2].split(/ +/);
   let rv = "";
   for (let i = 0; i < args.length; i++) {
      let val = config[args[i]];
      if (typeof val === "string") val = "\"" + val + "\"";
      rv = rv + "\n" + args[i] + " = " + val;
   }
   return rv.substring(1);
};

const set = (autumnblaze, msg, subcmd) => {
   return new Promise((resolve, reject) => {
      if (subcmd[0] === "noarg") resolve("what should I set?");
      subcmd = autumnblaze.randutils.getsubcmd(subcmd[2]);
      // verify only 2 "args"
      if (subcmd[0] === "empty") reject({
         send: true,
         content: "something went wrong"
      });
      if (subcmd[0] === "noarg") return resolve("what should i set \"" + subcmd[1] + "\" to?");
      // looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong line
      if ((subcmd[2].startsWith("\"") && subcmd[2].endsWith("\"")) || (subcmd[2].startsWith("'") && subcmd[2].endsWith("'")) || (subcmd[2].startsWith("`") && subcmd[2].endsWith("`"))) {
         subcmd[2] = subcmd[2].substring(1, subcmd[2].length - 1);
      }
      const update = {};
      update[subcmd[1]] = subcmd[2];
      autumnblaze.mango.promise.updateservconfig(autumnblaze.db, msg.guild, update).then(val => {
         if (Array.isArray(val)) {
            reject({
               send: true,
               content: "something went wrong :(",
               logcontent: val[1]
            });
         } else if (val === true) {
            msg.react("740800266269360188");
         } else reject({
            send: true,
            content: "something went wrong :(",
            logcontent: "config command, at the reactions area thing, val isnt true and val isnt array and something went wrong with _updateservconfig_promise and this is going to take you forever to fix i think"
         });
      });
   });
};
