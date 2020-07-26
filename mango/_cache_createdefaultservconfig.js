"use strict";

module.exports = (mongodatabase, guild, callback) => {
   // create still queries the db since its one time, and dump relies on this existing
   const cache = require("./_cache");
   require("./createdefaultservconfig")(mongodatabase, guild, val => {
      if (!val) return callback(undefined);
      cache[guild.id] = {
         guildsettings: {
            lastupdate: Date.now(),
            needsupdate: false,
            the: val
         }
      };
      callback(require("../randutils").copyobj(val));
   });
};
