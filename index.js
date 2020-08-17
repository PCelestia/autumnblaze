"use strict";

const autumnblaze = (opts = {}) => {
   const warnmissingreq = (one, two) => {
      console.warn("you need to supply a " + one + ".\nfor example:\nconst bot = require(\"autumnblaze\")({\n   " + two + ": \"put-your-" + two + "-here\",\n   otheropts: \"other things\"\n});\n\nthe readme at \"https://github.com/pcelestia/autumnblaze/\" might be helpful");
      process.exit(1);
   };

   // check for missing token and mongodbconnectionstring
   if ((opts.token === undefined)) {
      warnmissingreq("bot token", "token");
   }
   if (opts.mongodbconnectionstring === undefined) {
      warnmissingreq("mongodb connection string", "mongodbconnectionstring");
   }
   // if (opts.derpiapikey === undefined) {
   //    warnmissingreq("derpibooru api key", "derpiapikey");
   // }
   if (opts.usecache === true) {
      console.warn("cache is not usable, disabling");
      opts.usecache = false;
   }

   const discord = require("discord.js");

   // required options (token, mongodb connection string etc) obviously not here, can't default that
   const defaultopts = {
      database: "autumnblazebot",
      debug: false,
      embedcolors: ["#FBFBDE", "#C7C497", "#C86120", "#E5C00D", "#FFEC6F", "#C7C497", "#4DFFFF"],
      env: "production",
      ownerid: "379800645571575810",
      prefix: "autumn ",
      radiostreamurl: "http://fancynoise.xyz:8000/radio",
      reponame: "pcelestia/autumnblaze",
      sharded: false,
      shardnum: 0,
      usecache: false
   };

   const randutils = require("./randutils")(autumnblaze);
   autumnblaze.randutils = randutils;

   // take opts and patch it into the default opts
   var patchedopts = randutils.copyobj(defaultopts);
   for (const key in opts) patchedopts[key] = opts[key];
   autumnblaze.opts = patchedopts;

   const bot = new discord.Client();
   bot.on("warn", console.warn);
   bot.on("error", console.error);
   autumnblaze.bot = bot;

   // stamp le console
   require("./patchconsole")(autumnblaze);

   // handle different events and things
   autumnblaze.events = require("./events")(autumnblaze);

   autumnblaze.packagejson = require("./package.json");
   autumnblaze.version = autumnblaze.packagejson.version;
   autumnblaze.defaultopts = defaultopts;

   autumnblaze.text = require("./text");
   // AUTOMATED ACTIONS ARE KNOWN AS MODULES TO THE USER
   autumnblaze.automatedactions = autumnblaze.text.automatedactions;
   autumnblaze.commands = autumnblaze.text.commands;

   autumnblaze.connectbot = () => {
      return new Promise(resolve => {
         console.log("connecting to discord...");
         autumnblaze.bot.login(autumnblaze.opts.token).then(token => {
            // why did i do this? (token erase part) i really dont know
            token = "erased";
            if (token !== "erased") {
               console.warn("token not erased or smth idk lol, ignore this lol");
               console.warn("if this pops up then something is def wrong");
            }
            console.log("connection to discord success!!");
            autumnblaze.hcooldown = (1000 * 30);
            autumnblaze.h = Date.now() - autumnblaze.hcooldown;
            resolve(autumnblaze);
         });
      });
   };
   let dbserv;
   autumnblaze.connectdb = () => {
      return new Promise(resolve => {
         console.log("connecting to mongodb...");
         require("./mango")(autumnblaze.opts.mongodbconnectionstring, autumnblaze.opts.usecache).then(val => {
            autumnblaze.db = val[0].db(autumnblaze.opts.database);
            dbserv = val[0];
            autumnblaze.mango = val[1];
            autumnblaze.defaultguildsettings = autumnblaze.mango.defaultconfigs.defaultguildsettings;
            autumnblaze.defaultusersettings = autumnblaze.mango.defaultconfigs.defaultusersettings;
            console.log("connection to mongodb success!!");
            resolve(autumnblaze);
         });
      });
   };
   autumnblaze.connect = () => {
      console.log("running autumnblaze v" + autumnblaze.version);
      // log some opts (manually on purpose)
      console.log("using database " + autumnblaze.opts.database);
      console.log("radiostreamurl " + autumnblaze.opts.radiostreamurl);
      console.log("default prefix " + autumnblaze.opts.prefix);
      console.log("is sharded     " + autumnblaze.opts.sharded);
      console.log("cache          " + (autumnblaze.opts.cache === true));
      if (autumnblaze.opts.sharded) console.log("shardnum       " + autumnblaze.opts.shardnum);
      if (autumnblaze.opts.host) console.log("host           " + autumnblaze.opts.host);
      if (autumnblaze.opts.location) console.log("location       " + autumnblaze.opts.location);

      return autumnblaze.connectdb().then(r => r.connectbot()).then(() => console.log("fully connected!!")).catch(console.warn);
   };
   autumnblaze.stop = async () => {
      if (autumnblaze.isrubbish) return;

      console.log("disconnecting...");
      autumnblaze.stopbot();
      // if (autumnblaze.opts.usecache) autumnblaze.mango.dump(autumnblaze).then(stopmango);
      // else
      autumnblaze.stopmango();

      autumnblaze.isrubbish = true;
   };
   autumnblaze.stopmango = async () => {
      return new Promise(resolve => {
         dbserv.close(false, () => {
            console.log("disconnected from mongodb");
            resolve();
         });
      });
   };
   autumnblaze.stopbot = async () => {
      autumnblaze.bot.destroy();
      console.log("disconnected from discord");
   };

   process.on("SIGINT", autumnblaze.stop);
   process.on("SIGTERM", autumnblaze.stop);
   process.on("exit", autumnblaze.stop);
   process.on("unhandledRejection", console.promiserejection);

   return autumnblaze;
};

if (require.main === module) {
   require("dotenv").config();
   const configobj = {};
   const availablevars = [
      "TOKEN",
      "MONGODBCONNECTIONSTRING",
      "ENV",
      "DATABASE",
      "DEBUG",
      "EMBEDCOLORS",
      "DERPIAPIKEY",
      "HOST",
      "LOCATION",
      "OWNERID",
      "PREFIX",
      "RADIOSTREAMURL",
      "REPONAME",
      "USECACHE",
      "WARNCHANNEL"
   ];

   availablevars.forEach(configvar => {
      if (process.env[configvar]) configobj[configvar.toLowerCase()] = process.env[configvar];
   });
   autumnblaze(configobj).connect();
} else module.exports = autumnblaze;
