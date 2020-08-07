"use strict";

const thecmd = async (_, __, autumnblaze) => {
   return new Promise((resolve, reject) => {
      const superagent = require("superagent");
      superagent.get("https://theponyapi.com/api/v1/pony/random").then(res => {
         let responsething = "";
         res.body.pony.tags.forEach(tag => {
            if (tag.startsWith("artist")) responsething = responsething + tag + "\n";
         });
         responsething = responsething + "source: <" + res.body.pony.sourceURL + ">\n" + res.body.pony.representations.full;
         autumnblaze.mango.promise.putpony(autumnblaze.db, res.body.pony).catch(console.warn);
         resolve(responsething);
      }).catch(err => {
         console.warn(err);
         resolve("sorry, an error occured");
      });
   });
};

thecmd.allowguild = true;
thecmd.description = "get a random pony image";
thecmd.showinhelp = true;
thecmd.category = "pony";
thecmd.usetyping = true;
module.exports = thecmd;
