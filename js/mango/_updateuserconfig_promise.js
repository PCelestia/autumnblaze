"use strict";

module.exports = (mongodatabase, user, update) => {
   return new Promise(resolve => {
      mongodatabase.collection("user" + user.id).findOneAndUpdate({ name: "usersettings" }, { $set: update }, err => {
         if (err) {
            console.warn("mongoerror in updating user config");
            console.warn(err);
            resolve([false, err]);
         } else resolve(true);
      });
   });
};
