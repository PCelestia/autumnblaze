"use strict";

module.exports = (str, subcmd) => {
   if (!str.startsWith(subcmd)) return [false];
   if (str === subcmd) return [true, ""];
   if (str.substring(0, subcmd.length + 1) === subcmd + " ") {
      const argz = str.substring(subcmd.length + 1);
      return [true, argz];
   }
   return [false];
};
