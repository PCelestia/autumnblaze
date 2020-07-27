"use strict";

module.exports = (mongodatabase, user, callback) => {
   const defaultconfig = require("./defaultconfigs").defaultusersettings;
   mongodatabase.collection("user" + user.id).insertOne(defaultconfig, (err, res) => {
      if (err) {
         // err
         console.warn("mongoerror in getting server config");
         console.warn(err);
         callback(undefined);
         return;
      }
      if (res && (res.result.ok === 1) && (res.result.n === 1)) {
         callback(defaultconfig);
      } else {
         console.warn("silly error callback didnt return a value but didnt err, hmmmmm (mango/createdefaultuserconfig)");
      }
   });
};
