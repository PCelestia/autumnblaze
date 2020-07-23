"use strict";
// mongodb connection and things thewjo

// i know i could use the same method to autofill everything as i did with commands,
// but these aren't gonna grow so fast and its easier to just do it this way
// when it gets big enough i will
const fs = require("fs");
const path = require("path");
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
const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
files.forEach(file => {
   if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
   mango[file] = require("./" + file);
});

module.exports = mango;
