"use strict";

module.exports = (mongodatabase, user, callback) => {
   const cache = require("./_cache");
   require("./getuserconfig")(mongodatabase, user, val => {
      if (!val) callback(undefined);
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
