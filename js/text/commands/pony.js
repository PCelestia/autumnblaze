"use strict";

const thecmd = {};
thecmd.exec = (_, __, autumnblaze) => {
   return new Promise((resolve, reject) => {
      const superagent = require("superagent");
      superagent.get("https://theponyapi.com/api/v1/pony/random").then(res => {
         let responsething = "";
         res.body.pony.tags.forEach(tag => {
            if (tag.startsWith("artist")) responsething = responsething + tag + "\n";
         });
         responsething = responsething + "source: <" + res.body.pony.sourceURL + ">\n" + res.body.pony.representations.full;

         const dbpony = {};
         dbpony.derpiId = res.body.pony.derpiId;
         dbpony.id = res.body.pony.id;
         dbpony.mimeType = res.body.pony.mimeType;
         dbpony.originalFormat = res.body.pony.mimeType;
         dbpony.representations = res.body.pony.representations;
         dbpony.sourceURL = res.body.pony.sourceURL;
         dbpony.tags = res.body.pony.tags;

         autumnblaze.mango.promise.putpony(autumnblaze.db, dbpony).catch(console.warn);
         resolve(responsething);
      }).catch(err => reject({
         send: true,
         content: "sorry, an error occured",
         logcontent: err
      }));
   });
};

thecmd.allowguild = true;
thecmd.description = "get a random pony image";
thecmd.showinhelp = true;
thecmd.category = "pony";
thecmd.usetyping = true;
module.exports = thecmd;
