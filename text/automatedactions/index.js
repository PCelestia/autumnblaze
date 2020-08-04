"use strict";

const fs = require("fs");
const path = require("path");
const actions = {};

const files = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file !== "index.js" && !file.startsWith("_"));
files.forEach(file => {
   if (file.endsWith(".js")) file = file.slice(0, file.length - 3);
   actions[file] = require("./" + file);
});

const _run = async (msg, config, autumnblaze) => {
   if (msg.channel.type === "dm") return;
   for (const action in actions) if (!action.startsWith("_")) {
      actions[action](msg, config, autumnblaze);
   }
};

actions._run = _run;
module.exports = actions;
