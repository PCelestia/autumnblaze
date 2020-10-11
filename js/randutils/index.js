"use strict";

module.exports = autumnblaze => {
   const fs = require("fs");
   const path = require("path");
   var randutils = {};
   const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
   files.forEach(file => {
      if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
      randutils[file] = require("./" + file);
      if (randutils[file].setup) randutils[file].setup(autumnblaze);
   });
   return randutils;
};
