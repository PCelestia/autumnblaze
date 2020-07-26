"use strict";

module.exports = (mongodatabase, user, callback) => {
   require("./createdefaultuserconfig")(mongodatabase, user, val => {
      if (!val) return callback(undefined);
      require("./_cache")["user" + user.id] = {
         usersettings: {
            lastupdate: Date.now(),
            needsupdate: false,
            the: val
         }
      };
      callback(val);
   });
};
