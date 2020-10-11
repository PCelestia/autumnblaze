"use strict";

module.exports = (mongodatabase, user, callback) => {
   return new Promise(resolve => {
      require("./createdefaultuserconfig")(mongodatabase, user, resolve);
   });
};
