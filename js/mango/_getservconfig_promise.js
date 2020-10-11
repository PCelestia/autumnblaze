"use strict";

module.exports = (mongodatabase, guild) => {
   return new Promise(resolve => {
      require("./getservconfig")(mongodatabase, guild, resolve);
   });
};
