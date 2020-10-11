"use strict";

module.exports = autumnblaze => () => {
   console.log("discord session invalidated, automatically disconnected");
   autumnblaze.stopmango();
};
