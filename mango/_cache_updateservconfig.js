"use strict";

// assume there is one available
module.exports = (mongodatabase, guild, update, callback = () => {}) => {
   // tmp update cache cause why not lol
   const cache = require("./_cache");
   cache[guild.id].guildsettings.lastupdate = Date.now();
   cache[guild.id].guildsettings.needsupdate = true; // just temp
   for (const key in update) cache[guild.id].guildsettings.the[key] = update[key];

   mongodatabase.collection(guild.id).findOneAndUpdate({ name: "guildsettings" }, { $set: update }, err => {
      if (err) {
         console.warn("mongoerror in updating server config");
         console.warn(err);
         callback(false, err);
         return;
      }
      callback(true);
   });
};
