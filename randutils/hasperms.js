"use strict";

module.exports = async (msg, ...perms) => {
   // get list of user perms
   const userperms = msg.member.permissions;
   const allperms = require("./perms").keyint;
   const doesnthave = [];

   // iterate through array of given perms, check each one is included in userperms
   perms.forEach(perm => {
      if (!userperms.has(allperms[perm])) {
         console.log("doesnthave");
         doesnthave.push(perm);
      }
   });
   if (doesnthave.length > 0) {
      // future: process array to make printed value more user friendly
      throw rejectval(doesnthave);
   }
   return true;
};

const rejectval = perms => ({
   send: true,
   content: "must have perms " + perms
});
