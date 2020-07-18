"use strict";

const thecmd = async (cmd, msg) => {
   if (msg.channel.type === "dm") return "not allowed in dms yet";
   const autumnblaze = require("../../lebottieinitthig");

   const set = autumnblaze.randutils.checksubcmd(cmd, "set");
   if (set[0]) {
      const args = set[1];
      const keytoset = args.substring(0, args.indexOf(" "));
      let valuetoset = args.substring(args.indexOf(" ") + 1);

      if ((keytoset === "") && (valuetoset === args)) return "need to specify what to set the value to";

      // valuetoset = valuetoset.substring(1, valuetoset.length - 1);
      if ((valuetoset.startsWith("\"") && valuetoset.endsWith("\"")) || (valuetoset.startsWith("'") && valuetoset.endsWith("'"))) {
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
