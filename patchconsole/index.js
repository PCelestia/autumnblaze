"use strict";

let consolestampwarn;
let channel;
module.exports = autumnblaze => {
   require("console-stamp")(console, {
      pattern: "dd-mm-yyyy HH:MM:ss.l",
      colors: {
         stamp: "white",
         label: "orange"
      }
   });
   consolestampwarn = console.warn;
   channel = autumnblaze.opts.warnchannel;
   console.warn = (...stuff) => {
      consolestampwarn(...stuff);
      if (!channel) return;
      let combinedstuff = "";
      stuff.forEach(thing => {
         if (thing.stack && thing.message) combinedstuff = combinedstuff + thing.stack + "\n\n";
         else combinedstuff = combinedstuff + thing.toString();
      });
      autumnblaze.bot.channels.fetch(channel).then(channel => {
         channel.send("```" + combinedstuff + "```");
      }).catch(() => {});
   };
};
