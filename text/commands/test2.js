"use strict";

const thecmd = cmd => {
   return "le test cmd 22 " + cmd;
};

thecmd.description = "this is a test command #2";
thecmd.showinhelp = true;
thecmd.category = "test";

module.exports = thecmd;
