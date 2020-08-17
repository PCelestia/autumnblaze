"use strict";

const thecmd = {};
thecmd.exec = async (cmd, msg, autumnblaze) => {
   return new Promise((resolve, reject) => {
      autumnblaze.mango.getuserconfig(autumnblaze.db, msg.author, val => {
         // stuff
         if (val === undefined) return reject({
            send: true,
            content: "something happened, dm Autumn Blaze#2864 about this please"
         });
         resolve(JSON.stringify(val));
      });
   });
};

thecmd.allowdm = true;
thecmd.description = "le test lol wyd";
thecmd.showinhelp = true;
thecmd.category = "test";
module.exports = thecmd;
