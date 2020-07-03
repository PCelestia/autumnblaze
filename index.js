"use strict";

require("console-stamp")(console, {
   pattern: "dd-mm-yyyy HH:MM:ss.l",
   colors: {
      stamp: "white",
      label: "orange"
   }
});
const discord = require("discord.js");
// default options
const defaultopts = {
   prefix: "autumnt "
};

// the main creating bot thingie
const autumnblaze = (opts = {}) => {
   // return a bott
   if (opts.token === undefined) {
      // warn and exit when no token supplied
      console.warn("you need to supply a bot token.\nfor example:\nconst bot = require(\"autumnblaze\")({\n   token: \"put-your-discord-bot-token-here\",\n   otheropts: \"other things\"\n});\n\ncreate a bot account and get a bot token at \"https://discord.com/developers\"\nif you need help, do a google search, there are plenty of guides on how to create a bot account and how to add it to your server");
      process.exit(1);
   }
   // take defaults, put in opts if not present
   // for (const key in defaultopts) if (opts[key] === undefined) opts[key] = defaultopts[key];

   // take opts and patch it into the default opts (faster)
   const { copyobj } = require("./randutils");
   var patchedopts = copyobj(defaultopts);
   for (const key in opts) patchedopts[key] = opts[key];

   // console.log(opts);
   // debug

   // connect to mongo needed here
   const bot = new discord.Client();

   autumnblaze.bot = bot;
   autumnblaze.opts = patchedopts;

   return autumnblaze;
};
autumnblaze.defaultopts = defaultopts;

autumnblaze.connect = () => {
   autumnblaze.bot.login(autumnblaze.opts.token).then(token => {
      token = "erased";
      if (token !== "erased") {
         console.log("token not erased or smth idk lo, ignore this lol");
      }
      console.log("connection success!!");
   }).catch(err => {
      console.log("connection failed lol");
      console.log(err);
   });
};

module.exports = autumnblaze;
