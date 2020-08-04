"use strict";

const thecmd = async (cmd, msg, autumnblaze, dm) => {
   if (dm) return "not allowed in dms yet";

   const set = autumnblaze.randutils.checksubcmd(cmd, "set");
   if (set[0]) {
      // verify perms
      await autumnblaze.randutils.hasperms(msg, "MANAGE_GUILD");

      // get key and value from arg
      const args = set[1];
      const keytoset = args.substring(0, args.indexOf(" "));
      let valuetoset = args.substring(args.indexOf(" ") + 1);

      // if theres no space, then keytoset === "" and valuetoset equals the original value
      // so this is a check to see if specified enough args
      if ((keytoset === "") && (valuetoset === args)) return "need to specify what to set the value to";

      // handle boolean values
      if (keytoset !== "prefix") {
         if (valuetoset.toLowerCase() === "true") return await setcmd(autumnblaze, msg, keytoset, true);
         if (valuetoset.toLowerCase() === "false") return await setcmd(autumnblaze, msg, keytoset, false);
      }

      // handle num values
      const numvaluetoset = Number(valuetoset);
      if (!isNaN(numvaluetoset)) return await setcmd(autumnblaze, msg, keytoset, numvaluetoset);

      // check for quotes (single double backtick) and remove
      // looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong line
      if ((valuetoset.startsWith("\"") && valuetoset.endsWith("\"")) || (valuetoset.startsWith("'") && valuetoset.endsWith("'")) || (valuetoset.startsWith("`") && valuetoset.endsWith("`"))) {
         valuetoset = valuetoset.substring(1, valuetoset.length - 1);
      }
      return await setcmd(autumnblaze, msg, keytoset, valuetoset);
   }

   const get = autumnblaze.randutils.checksubcmd(cmd, "get");
   if (get[0]) {
      return await getcmd(autumnblaze, get, msg);
   }

   return "that can't be right";

   // autumnblaze.mango.updateservconfig(autumnblaze.db, msg.channel.guild, )
};

thecmd.allowguild = true;
thecmd.perms = ["MANAGE_GUILD"];
thecmd.description = "change bot configuration for this guild (ex. prefix, enable/disable things, etc)";
thecmd.showinhelp = true;
thecmd.category = "utility";
module.exports = thecmd;


const getcmd = async (autumnblaze, get, msg) => {
   return new Promise(resolve => {
      autumnblaze.mango.getservconfig(autumnblaze.db, msg.guild, result => {
         result = result[get[1]];
         if (result === null) return resolve("null");

         if (result === undefined) return resolve("undefined");

         if (result === "") return resolve("<nothing>");

         if (result.replace(/\s/g).length === 0) return resolve("<spaces>");
         return resolve("`" + result + "`");
      }, autumnblaze.defaultguildsettings);
   });
};

const setcmd = async (autumnblaze, msg, key, val) => {
   return new Promise((resolve, reject) => {
      const update = {};
      update[key] = val;
      autumnblaze.mango.updateservconfig(autumnblaze.db, msg.guild, update, () => {
         resolve("done");
      });
      // autumnblaze.mango.updateservconfig
   });
};
