"use strict";

module.exports = autumnblaze => {
   return message => {
      autumnblaze.text.processmessage(message, autumnblaze);
   };
};
