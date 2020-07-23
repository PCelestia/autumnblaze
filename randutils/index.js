"use strict";
// i know i could use the same method to autofill everything as i did with commands,
// but these aren't gonna grow so fast and its easier to just do it this way
// when it gets big enough i will
const fs = require("fs");
const path = require("path");
var randutils = {};

const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
files.forEach(file => {
   if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
   randutils[file] = require("./" + file);
});

module.exports = randutils;
