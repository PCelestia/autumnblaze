"use strict";

module.exports = (mongodatabase, guild, callback, defaultconfig) => {
   mongodatabase.collection(guild.id).insertOne(defaultconfig, (err, res) => {
      if (err) {
         // err
         console.warn("mongoerror in getting server config");
         console.warn(err);
         callback(undefined);
         return;
      }
      if (res && (res.ok === 1) && (res.n === 1)) {
         callback(res);
      } else {
         console.warn("silly error callback didnt return a value but didnt err, hmmmmm (mango/createdefaultservconfig)");
      }
   });
};
