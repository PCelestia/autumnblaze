"use strict";

let consolestampwarn;
let consolestamperr;
let channel;
const getstrofthing = thing => {
   if (thing.stack) return thing.stack + "\n\n";
   else return thing.toString();
}
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

   consolestampwarn = console.warn;
   console.warn = (...stuff) => {
      consolestampwarn(...stuff);
      let combinedstuff = "";
      stuff.forEach(thing => {
         combinedstuff = combinedstuff + getstrofthing(thing);
      });
      autumnblaze.bot.channels.fetch(channel).then(channel => {
         channel.send("WARNING:\n```" + combinedstuff + "```");
      }).catch(() => {});
   };

   consolestamperr = console.error;
   console.error = (...stuff) => {
      consolestamperr(...stuff);
      let combinedstuff = "";
      stuff.forEach(thing => {
         combinedstuff = combinedstuff + getstrofthing(thing);
      });
      autumnblaze.bot.channels.fetch(channel).then(channel => {
         channel.send("ERROR:\n```" + combinedstuff + "```");
      }).catch(() => {});
   };
};
// error
// warn
