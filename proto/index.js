"use strict";

const fs = require("fs");
const path = require("path");
const proto = {};
const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
files.forEach(file => {
   if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
   proto[file] = require("./" + file);
});
module.exports = proto;
