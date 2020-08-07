"use strict";
// lol i guess if a field is undefined it uses the default

module.exports = {
   defaultguildsettings: {
      name: "guildsettings"
   },
   defaultusersettings: {
      name: "usersettings"
   },
   reset: () => {
      module.exports = {
         defaultguildsettings: {
            name: "guildsettings"
         },
         defaultusersettings: {
            name: "usersettings"
         }
      };
   }
};
