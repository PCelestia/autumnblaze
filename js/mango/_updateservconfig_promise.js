"use strict";

// assume there is one available
module.exports = (mongodatabase, guild, update) => {
   return new Promise(resolve => {
      require("./updateservconfig")(mongodatabase, guild, update, (good, err) => {
         if (good) resolve(good);
         else resolve([good, err]);
      });
   });
};
