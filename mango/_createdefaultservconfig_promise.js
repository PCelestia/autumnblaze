"use strict";

module.exports = (mongodatabase, guild) => {
   return new Promise(resolve => {
      require("./createdefaultservconfig")(mongodatabase, guild, resolve);
   });
};
