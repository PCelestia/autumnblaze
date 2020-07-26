"use strict";

module.exports = (mongodatabase, guild, callback) => {
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
      callback(val);
   });
};
