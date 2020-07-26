"use strict";

module.exports = (mongodatabase, user, callback) => {
   const cache = require("./_cache");
   if (cache["user" + user.id]) if (cache["user" + user.id].usersettings) return callback(require("../randutils").copyobj(cache["user" + user.id].usersettings.the));
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
