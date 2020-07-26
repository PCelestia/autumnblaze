"use strict";

module.exports = (mongodatabase, user, callback) => {
   // create still queries the db since its one time, and dump relies on this existing
   const cache = require("./_cache");
   require("./createdefaultuserconfig")(mongodatabase, user, val => {
      if (!val) return callback(undefined);
      cache["user" + user.id] = {
         usersettings: {
            lastupdate: Date.now(),
            needsupdate: false,
            the: val
         }
      };
      callback(require("../randutils").copyobj(val));
   });
};
