"use strict";

// empty      if str is ""
// noarg      if str doesnt contain space, so no args
// arg        if str contains a space, so there is args
module.exports = str => {
   if (str === "") return ["empty"];
   const cmd = str.substring(0, str.indexOf(" "));
   const otherargs = str.substring(str.indexOf(" ") + 1);

   // rv [whether or not has more arg, cmd, otherarg]
   // otherarg is "" if no other arg
   if ((cmd === "") && (otherargs === str)) return ["noarg", str, ""];
   return ["arg", cmd, otherargs];
};
