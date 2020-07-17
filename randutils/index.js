"use strict";
// i know i could use the same method to autofill everything as i did with commands,
// but these aren't gonna grow so fast and its easier to just do it this way
// when it gets big enough i will
var randutils = {};

randutils.copyobj = require("./copyobj");
randutils.randfromarray = require("./randfromarray");
randutils.botpinged = require("./botpinged");
randutils.checkperms = require("./checkperms");
randutils.checksubcmd = require("./checksubcmd");

module.exports = randutils;
