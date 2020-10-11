"use strict";

module.exports = (mongodatabase, user, update, callback = () => {}) => {
   require("./_updateuserconfig_promise")(mongodatabase, user, update).then(res => {
      if (Array.isArray(res)) callback(...res);
      else callback(res);
   });
};
