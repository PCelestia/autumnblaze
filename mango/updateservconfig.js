"use strict";

module.exports = (mongodatabase, guild, update, callback = () => {}) => {
   mongodatabase.collection(guild.id).findOneAndUpdate({ name: "guildsettings" }, { $set: update }, err => {
      if (err) {
         console.warn("mongoerror in updating server config");
         console.warn(err);
         callback(false, err);
         return;
      }
      callback(true);
   });
};
