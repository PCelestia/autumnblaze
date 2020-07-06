// mongodb connection and things thewjo
"use strict";

const mongodb = require("mongodb");
const mango = (connectionstr, dbname, callback) => {
   mongodb.MongoClient.connect(connectionstr, { useUnifiedTopology: true }, (err, res) => {
      if (err) {
         console.warn("mongoerror in connectingg");
         console.warn(err);
         callback(undefined);
         return;
      }
      if (res) {
         // gottem
         callback(res.db(dbname), res);
         return;
      } else {
         console.warn("mmmMMM????");
         process.exit(1);
      }
   });
};
mango.getservconfig = require("./getservconfig");
mango.createdefaultservconfig = require("./createdefaultservconfig");

module.exports = mango;
