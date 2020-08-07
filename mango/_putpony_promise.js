"use strict";

module.exports = (mongodatabase, pony) => {
   return new Promise(resolve => {
      require("./putpony")(mongodatabase, pony, resolve);
   });
};
