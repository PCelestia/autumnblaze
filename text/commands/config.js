"use strict";

const thecmd = async (cmd, msg) => {
   if (msg.channel.type === "dm") return "not allowed in dms yet";
   const autumnblaze = require("../../lebottieinitthig");

   const set = autumnblaze.randutils.checksubcmd(cmd, "set");
   if (set[0]) return "sorry doesnt work yet got set";

   const get = autumnblaze.randutils.checksubcmd(cmd, "get");
   if (get[0]) {
      return new Promise((resolve, reject) => {
         autumnblaze.mango.getservconfig(autumnblaze.db, msg.guild, result => {
            result = result[get[1]];
            if (result === null) return resolve("\"null\"");

            if (result === undefined) return resolve("\"undefined\" or default");

            if (result === "") return resolve("<nothing>");

            if (result.replace(/\s/g).length === 0) return resolve("<spaces>");
            return resolve("`" + result + "`");
         }, autumnblaze.defaultguildsettings);
      });
   }

   return "that can't be right";

   // autumnblaze.mango.updateservconfig(autumnblaze.db, msg.channel.guild, )
};

thecmd.allowguild = true;
thecmd.allowdm = true;
module.exports = thecmd;
