"use strict";

module.exports = (ar, ar2 = null, ar3 = null, ar4 = null) => {
   // assuming all arrays are the same length
   const i = Math.floor(Math.random() * ar.length);
   if (ar4 != null) return [ar[i], ar2[i], ar3[i], ar4[i]];
   if (ar3 != null) return [ar[i], ar2[i], ar3[i]];
   if (ar2 != null) return [ar[i], ar2[i]];
   return ar[i];
};
