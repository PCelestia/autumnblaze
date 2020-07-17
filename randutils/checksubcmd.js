"use strict";

module.exports = (str, subcmd) => {
   if (!str.startsWith(subcmd)) return [false];
   if (str === subcmd) return [true, ""];
   const argz = str.substring(subcmd.length + 1);
   if (argz === subcmd + " ") return [true, argz];
};
