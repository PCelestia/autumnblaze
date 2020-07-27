"use strict";

// in this directory there are automated things (except command cause obviously)

const fs = require("fs");
const path = require("path");
const text = {};

const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
files.forEach(file => {
   if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
   text[file] = require("./" + file);
});

module.exports = text;
