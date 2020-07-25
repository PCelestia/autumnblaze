"use strict";

module.exports = (mongodatabase, user, callback) => {
   mongodatabase.collection("user" + user.id).findOne({ name: "usersettings" }, (err, res) => {
      if (err) {
         // err
         console.warn("mongoerror in getting server config");
         console.warn(err);
         callback(undefined);
         return;
      }
      if (res) {
         // gottem
         callback(res);
         return;
      } else {
         // not gottem
         require("./index").createdefaultuserconfig(mongodatabase, user, callback);
      }
   });
};
