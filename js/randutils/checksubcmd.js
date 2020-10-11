"use strict";
// rv[0] whether or not is a match
// if match rv[1] is rest of args (excluding the space)

module.exports = (str, subcmd) => {
   if (!str.startsWith(subcmd)) return [false];
   if (str === subcmd) return [true, ""];
   if (str.substring(0, subcmd.length + 1) === subcmd + " ") {
      const argz = str.substring(subcmd.length + 1);
      return [true, argz];
   }
   return [false];
};
