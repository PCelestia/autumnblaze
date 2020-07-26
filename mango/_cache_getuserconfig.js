"use strict";

module.exports = (mongodatabase, user, callback) => {
   require("./getuserconfig")(mongodatabase, user, val => {
      if (!val) callback(undefined);
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
