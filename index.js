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
   prefix: "autumn ",
   mongodatabase: "autumnblazebot",
   radiostreamurl: "http://fancynoise.xyz:8000/radio"
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
   const randutils = require("./randutils");
   autumnblaze.randutils = randutils;

   var patchedopts = randutils.copyobj(defaultopts);
   for (const key in opts) patchedopts[key] = opts[key];

   // console.log(opts);
   // debug

   // connect to mongo needed here --------------------------------------------------------------------------------------------------------
   const bot = new discord.Client();
   bot.on("warn", m => console.warn(m));
   // bot.on("debug", m => console.debug(m));


   autumnblaze.bot = bot;
   autumnblaze.opts = patchedopts;

   autumnblaze.text = require("./text");
   autumnblaze.commands = autumnblaze.text.commands;

   // process potential command
   bot.on("message", (message) => {
      // if no prefix, log it then get out
      if (!(message.content.substring(0, autumnblaze.opts.prefix.length) === autumnblaze.opts.prefix)) {
         console.log(randutils.logmsg(message));
         return;
      }

      // loggie
      console.log(randutils.logcmdmsg(message));
      // strip out the prefix, and process it
      const sentcmd = message.content.substring(autumnblaze.opts.prefix.length);

      for (const cmd in autumnblaze.commands) if (sentcmd.substring(0, cmd.length + 1) === cmd + " ") {
         message.channel.send(autumnblaze.commands[cmd](sentcmd.substring(cmd.length + 1)));
         return;
      }
   });


   return autumnblaze;
};
autumnblaze.defaultopts = defaultopts;

autumnblaze.connect = () => {
   autumnblaze.bot.login(autumnblaze.opts.token).then(token => {
      token = "erased";
      if (token !== "erased") {
         console.warn("token not erased or smth idk lol, ignore this lol");
         console.warn("if this pops up then something is def wrong");
      }
      console.log("connection success!!");
   }).catch(err => {
      console.log("connection failed lol");
      console.log(err);
   });
};

module.exports = autumnblaze;
