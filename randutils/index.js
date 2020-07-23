"use strict";
// i know i could use the same method to autofill everything as i did with commands,
// but these aren't gonna grow so fast and its easier to just do it this way
// when it gets big enough i will
const fs = require("fs");
const path = require("path");
var randutils = {};

const randutilfiles = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file.endsWith(".js") && file !== "index.js" && !file.startsWith("_"));
randutilfiles.forEach(randutil => {
   const randutilnoext = randutil.slice(0, randutil.length - 3);
   randutils[randutilnoext] = require("./" + randutil);
});

module.exports = randutils;
