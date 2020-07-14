"use strict";

const thecmd = cmd => {
   return "le test cmd 33 " + cmd;
};

thecmd.description = "this is a test command #3";
thecmd.showinhelp = true;
thecmd.category = "test";

module.exports = thecmd;
