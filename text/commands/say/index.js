"use strict";

const thecmd = {};
const badwords = require("bad-words");
const filter = new badwords();

thecmd.exec = async (arg, msg, autumnblaze, dm, config, otherconfig) => {
   let userconfig;
   if (dm) userconfig = config;
   else userconfig = otherconfig;

   let numoftimes = userconfig.sayrejectnum || 0;
   if (filter.isProfane(arg)) {
      numoftimes++;
      await autumnblaze.mango.promise.updateuserconfig(autumnblaze.db, msg.author, { sayrejectnum: numoftimes });
      return getangryresponse(numoftimes);
   }
   return getnormalresponse(numoftimes, arg);


};

thecmd.allowdm = true;
thecmd.allowguild = true;
thecmd.showinhelp = true;
thecmd.category = "fun";
module.exports = thecmd;

const responses = require("./responses");
const getangryresponse = numoftimes => responses[numoftimes - 1];
const getnormalresponse = (numoftimes, arg) => {
   if (numoftimes > responses.length) return undefined;
   else return arg;
};
