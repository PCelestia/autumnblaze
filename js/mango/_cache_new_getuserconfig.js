"use strict";

module.exports = (mongodatabase, user, callback) => {
   // check the cache
   const cache = require("./_cache");
   const cacheconfig = cache.get("user" + user.id, "usersettings");
   if (cacheconfig) return cacheconfig;

   // noop get from mongo
   console.log("a usah query has baen made");
   require("./getuserconfig")(mongodatabase, user, val => {
      if (!val) return callback(undefined);
      cache.set("user" + user.id, "usersettings", val);
      callback(val);
   });
};
