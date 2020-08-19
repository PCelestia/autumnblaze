"use strict";

module.exports = autumnblaze => () => {
   console.log("discord session invalidated, automatically disconnected");
   autumnblaze.connectionstatus.discord = false;
   autumnblaze.stopmango();
};
