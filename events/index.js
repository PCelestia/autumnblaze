"use strict";

module.exports = autumnblaze => {
   const fs = require("fs");
   const path = require("path");

   const eventstuffs = {};
   const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
   files.forEach(file => {
      if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
      eventstuffs[file] = require("./" + file)(autumnblaze);

      autumnblaze.bot.on(file, eventstuffs[file]);
   });
   return eventstuffs;
};
