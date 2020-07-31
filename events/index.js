"use strict";

module.exports = autumnblaze => {
   const fs = require("fs");
   const path = require("path");

   const eventstuffs = {};
   const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
   files.forEach(file => {
      if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
      eventstuffs[file] = require("./" + file);

      autumnblaze.bot.on(file, (param1, param2 = undefined, param3 = undefined) => {
         eventstuffs[file](autumnblaze, param1, param2, param3);
      });
   });
   return eventstuffs;
};
