"use strict";

const consolestamp = {};
let channel;


module.exports = autumnblaze => {
   require("console-stamp")(console, {
      pattern: "dd-mm-yyyy HH:MM:ss.l",
      colors: {
         stamp: "white",
         label: "orange"
      }
   });
   channel = autumnblaze.opts.warnchannel;
   if (!channel) return;

   const send = (method, stuff) => {
      sendnodiscord(method, stuff);
      let combinedstuff = "";
      stuff.forEach(thing => {
         if (thing.stack) combinedstuff = combinedstuff + thing.stack + "\n\n";
         else combinedstuff = combinedstuff + thing.toString();
      });
      autumnblaze.bot.channels.fetch(channel).then(channel => channel.send("<@" + autumnblaze.opts.ownerid + ">  **" + method.toUpperCase() + "**:\n```" + combinedstuff + "```")).catch(consolestamp.error);
   };
   const sendnodiscord = (method, stuff) => {
      if (consolestamp[method]) consolestamp[method](...stuff);
   };

   consolestamp.warn = console.warn;
   consolestamp.error = console.error;

   console.warn = (...stuff) => send("warn", stuff);
   console.error = (...stuff) => send("error", stuff);
   console.promiserejection = (...stuff) => send("promise rejection", stuff);
};
// error
// warn
