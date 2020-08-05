"use strict";

module.exports = (mongodatabase, user) => {
   return new Promise(resolve => {
      require("./getuserconfig")(mongodatabase, user, resolve);
   });
};
