"use strict";

module.exports = (mongodatabase, guild, callback) => {
   console.log("a query has baen made");
   mongodatabase.collection(guild.id).findOne({ name: "guildsettings" }, (err, res) => {
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
         require("./createdefaultservconfig")(mongodatabase, guild, callback);
      }
   });
};
