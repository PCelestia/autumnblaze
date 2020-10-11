"use strict";

module.exports = (mongodatabase, pony, callback) => {
   mongodatabase.collection("poniez").insertOne(pony, (err, res) => {
      if (err) {
         // err
         console.warn("mongoerror in getting server config");
         console.warn(err);
         callback(undefined);
         return;
      }
      if (res && (res.result.ok === 1) && (res.result.n === 1)) {
         callback("ok");
      } else {
         console.warn("silly error callback didnt return a value but didnt err, hmmmmm (mango/putpony)");
      }
   });
};
