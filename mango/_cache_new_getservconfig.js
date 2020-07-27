"use strict";

module.exports = (mongodatabase, guild, callback) => {
   // check the cache
   const cache = require("./_cache");
   const cacheconfig = cache.get(guild.id, "guildsettings");
   if (cacheconfig) return cacheconfig;

   // noep
   console.log("a query has baen made");
   require("./getservconfig")(mongodatabase, guild, val => {
      if (!val) return callback(undefined);
      cache.set(guild.id, "guildsettings", val);
      callback(require("../randutils").copyobj(val));
   });
};
