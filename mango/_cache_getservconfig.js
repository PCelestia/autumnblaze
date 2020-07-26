"use strict";

module.exports = (mongodatabase, guild, callback) => {
   const cache = require("./_cache");
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
