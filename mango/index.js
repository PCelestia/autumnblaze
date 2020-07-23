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
const mangofiles = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file.endsWith(".js") && file !== "index.js" && !file.startsWith("_"));
mangofiles.forEach(fruit => {
   const fruitnoext = fruit.slice(0, fruit.length - 3);
   mango[fruitnoext] = require("./" + fruit);
});

module.exports = mango;
