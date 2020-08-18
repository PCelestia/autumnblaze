"use strict";
const thecmd = {};
const superagent = require("superagent");

thecmd.exec = async () => {
   const { body: { compliment } } = await superagent.get("https://complimentr.com/api");
   return compliment;
};

thecmd.allowguild = true;
thecmd.allowdm = true;
thecmd.showinhelp = true;
thecmd.category = "other";
thecmd.usetyping = true;
module.exports = thecmd;
