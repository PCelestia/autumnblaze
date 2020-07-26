"use strict";

module.exports = (mongodatabase, guild, callback) => {
   require("./getservconfig")(mongodatabase, guild, val => {
      if (!val) callback(undefined);
      require("./_cache")[guild.id] = {
         guildsettings: {
            lastupdate: Date.now(),
            needsupdate: false,
            the: val
         }
      };
      callback(val);
   });
};
