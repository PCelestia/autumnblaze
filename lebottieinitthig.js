"use strict";

if (require.main === module) {
   console.warn("are you trying to invoke this directly? go see how to use it on the github repo! (https://github.com/pcelestia/autumnblaze#very-basic-use)");
   process.exit(1);
}

const discord = require("discord.js");
// default options
const defaultopts = {
   mongodbconnectionstring: "mongodb://localhost:27017",
   mongodatabase: "autumnblazebot",
   radiostreamurl: "http://fancynoise.xyz:8000/radio",
   prefix: "autumn ",
   debug: false,
   embedcolors: ["#FBFBDE", "#C7C497", "#C86120", "#E5C00D", "#FFEC6F", "#C7C497", "#4DFFFF"]
};
const defaultguildsettings = {
   name: "guildsettings"
};
// the main creating bot thingie
const autumnblaze = (opts = {}) => {
   // return a bott
   if (opts.token === undefined) {
      // warn and exit when no token supplied
      console.warn("you need to supply a bot token.\nfor example:\nconst bot = require(\"autumnblaze\")({\n   token: \"put-your-discord-bot-token-here\",\n   otheropts: \"other things\"\n});\n\ncreate a bot account and get a bot token at \"https://discord.com/developers\"\nif you need help, do a google search, there are plenty of guides on how to create a bot account and how to add it to your server");
      process.exit(1);
   }

   // stamp le console
   require("console-stamp")(console, {
      pattern: "dd-mm-yyyy HH:MM:ss.l",
      colors: {
         stamp: "white",
         label: "orange"
      }
   });
   // take defaults, put in opts if not present
   // for (const key in defaultopts) if (opts[key] === undefined) opts[key] = defaultopts[key];

   // take opts and patch it into the default opts (faster)
   const randutils = require("./randutils");
   autumnblaze.randutils = randutils;

   var patchedopts = randutils.copyobj(defaultopts);
   for (const key in opts) patchedopts[key] = opts[key];

   // console.log(opts);
   // debug

   const bot = new discord.Client();
   bot.on("warn", m => console.warn(m));
   // bot.on("debug", m => console.debug(m));


   autumnblaze.bot = bot;
   autumnblaze.opts = patchedopts;

   autumnblaze.text = require("./text");
   autumnblaze.commands = autumnblaze.text.commands;

   // process a message
   autumnblaze.bot.on("message", message => {
      autumnblaze.text.processmessage(message, autumnblaze);
   });


   return autumnblaze;
};
autumnblaze.defaultopts = defaultopts;
autumnblaze.defaultguildsettings = defaultguildsettings;

autumnblaze.connectbot = () => {
   autumnblaze.bot.login(autumnblaze.opts.token).then(token => {
      token = "erased";
      if (token !== "erased") {
         console.warn("token not erased or smth idk lol, ignore this lol");
         console.warn("if this pops up then something is def wrong");
      }
      console.log("connection success!!");
      autumnblaze.hcooldown = (1000 * 30);
      autumnblaze.h = Date.now() - autumnblaze.hcooldown;
   }).catch(err => {
      console.log("connection failed lol");
      console.log(err);
   });
   return autumnblaze;
};
autumnblaze.connectdb = () => {
   autumnblaze.mango = require("./mango");
   autumnblaze.mango(autumnblaze.opts.mongodbconnectionstring, autumnblaze.opts.mongodatabase, (db, serv) => {
      autumnblaze.db = db;
      autumnblaze.dbserv = serv;
   });
   return autumnblaze;
};
autumnblaze.connect = () => {
   console.log("running autumnblaze v" + require("./package.json").version);
   return autumnblaze.connectbot().connectdb();
};
autumnblaze.stop = () => {
   process.emit("SIGINT");
};
const fullstop = () => {
   // dont run if already rubbish'd
   if (autumnblaze.isrubbish) return;
   // cleanup things here

   // close connection with discord
   autumnblaze.bot.destroy();

   // close connection with mongo
   autumnblaze.dbserv.close();

   // declare rubbish
   autumnblaze.isrubbish = true;
   process.removeListener("SIGINT", autumnblaze.stop);

   console.log("closey");
};
process.once("SIGINT", fullstop);
process.once("SIGTERM", fullstop);

module.exports = autumnblaze;
