"use strict";

const thecmd = cmd => {
   return "le test cmd 11 " + cmd;
};

thecmd.description = "this is a test command #1";

module.exports = thecmd;
