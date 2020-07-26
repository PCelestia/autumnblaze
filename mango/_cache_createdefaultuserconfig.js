"use strict";

module.exports = (mongodatabase, user, callback) => {
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
      callback(val);
   });
};
