"use strict";

module.exports = (mongodatabase, guild, callback) => {
   require("./createdefaultservconfig")(mongodatabase, guild, val => {
      if (!val) return callback(undefined);
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
