"use strict";

module.exports = (mongodatabase, guild, callback) => {
   const cache = require("./_cache");
   if (cache[guild.id]) if (cache[guild.id].guildsettings) return callback(require("../randutils").copyobj(cache[guild.id].guildsettings.the));
   require("./getservconfig")(mongodatabase, guild, val => {
      if (!val) callback(undefined);
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
