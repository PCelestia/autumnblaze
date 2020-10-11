"use strict";

const thecmd = {};
thecmd.exec = (cmd, msg, autumnblaze) => {
   return autumnblaze.randutils.randfromarray(["Pong!", "Plonkee!", "<:lurk:709864149173403781>", "okie then", "plongz"]);
};

thecmd.description = "Pling mee";
thecmd.showinhelp = true;
thecmd.category = "other";
thecmd.allowguild = true;

module.exports = thecmd;
