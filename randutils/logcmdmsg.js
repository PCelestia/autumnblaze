"use strict";

module.exports = msg => {
   return "command " + require("./logmsg")(msg);
};
