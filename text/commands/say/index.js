"use strict";

const thecmd = {};
const badwords = require("bad-words");
const filter = new badwords();

thecmd.exec = async (arg, msg, autumnblaze, dm, config, otherconfig) => {
   let userconfig;
   if (dm) userconfig = config;
   else userconfig = otherconfig;

   let numoftimes = userconfig.sayrejectnum || 0;
   if (arg.includes("@everyone")) return "haha NOPE";
   if (filter.isProfane(arg)) {
      numoftimes++;
      await autumnblaze.mango.promise.updateuserconfig(autumnblaze.db, msg.author, { sayrejectnum: numoftimes });
      return getangryresponse(numoftimes, dm);
   }
   return getnormalresponse(numoftimes, arg, dm);


};

thecmd.allowdm = true;
thecmd.allowguild = true;
thecmd.showinhelp = true;
thecmd.category = "fun";
module.exports = thecmd;

const responses = require("./responses");
const getangryresponse = (numoftimes, dm) => {
   const response = responses[numoftimes - 1];
   if (dm) {
      if (response) return response;
      return "command not found";
   }
   return response;
};
const getnormalresponse = (numoftimes, arg, dm) => {
   if (numoftimes > responses.length) {
      if (dm) return "command not found";
      return undefined;
   } else return arg;
};
