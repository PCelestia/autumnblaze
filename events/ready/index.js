"use strict";

const fs = require("fs");
const path = require("path");

module.exports = autumnblaze => {
   const runners = [];
   const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
   files.forEach(file => {
      if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
      runners.push(require("./" + file)(autumnblaze));
      console.log(file);
   });
   return () => runners.forEach(runner => runner());
};
