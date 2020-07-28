"use strict";

// stamp le console
require("console-stamp")(console, {
   pattern: "dd-mm-yyyy HH:MM:ss.l",
   colors: {
      stamp: "white",
      label: "orange"
   }
});

if (require.main === module) {
   console.warn("are you trying to invoke this directly?");
   process.exit(1);
}

const warnmissingreq = (one, two) => {
   console.warn("you need to supply a " + one + ".\nfor example:\nconst bot = require(\"autumnblaze\")({\n   " + two + ": \"put-your-" + two + "-here\",\n   otheropts: \"other things\"\n});\n\nthe readme at \"https://github.com/pcelestia/autumnblaze/\" might be helpful");
   process.exit(1);
};
const autumnblaze = (opts = {}) => {
   // check for missing token and mongodbconnectionstring
   if ((opts.token === undefined)) {
      warnmissingreq("bot token", "token");
   }
   if (opts.mongodbconnectionstring === undefined) {
      warnmissingreq("mongodb connection string", "mongodbconnectionstring");
   }
   if (opts.usecache === true) {
      console.warn("cache is not usable, disabling");
      opts.usecache = false;
   }

   const discord = require("discord.js");

   // required options (token, mongodb connection string) obviously not here, can't default that
   const defaultopts = {
      database: "autumnblazebot",
      radiostreamurl: "http://fancynoise.xyz:8000/radio",
      prefix: "autumn ",
      debug: false,
      embedcolors: ["#FBFBDE", "#C7C497", "#C86120", "#E5C00D", "#FFEC6F", "#C7C497", "#4DFFFF"],
      usecache: false,
      sharded: false,
      shardnum: 0
   };

   const randutils = require("./randutils");
   autumnblaze.randutils = randutils;

   // take opts and patch it into the default opts
   var patchedopts = randutils.copyobj(defaultopts);
   for (const key in opts) patchedopts[key] = opts[key];
   autumnblaze.opts = patchedopts;

   // log some opts (manually on purpose)
   const l = msg => console.log(msg);
   l("using database " + autumnblaze.opts.database);
   l("radiostreamurl " + autumnblaze.opts.radiostreamurl);
   l("default prefix " + autumnblaze.opts.prefix);
   l("is sharded     " + autumnblaze.opts.sharded);
   l("cache          " + autumnblaze.opts.cache);
   if (autumnblaze.opts.sharded) l("shardnum       " + autumnblaze.opts.shardnum);
   if (autumnblaze.opts.host) l("host           " + autumnblaze.opts.host);
   if (autumnblaze.opts.location) l("location       " + autumnblaze.opts.location);

   const bot = new discord.Client();
   bot.on("warn", console.warn);

   autumnblaze.bot = bot;

   // process a message
   autumnblaze.bot.on("message", message => {
      autumnblaze.text.processmessage(message, autumnblaze);
   });

   autumnblaze.packagejson = require("./package.json");
   autumnblaze.version = autumnblaze.packagejson.version;
   autumnblaze.defaultopts = defaultopts;

   autumnblaze.text = require("./text");
   autumnblaze.automatedactions = autumnblaze.text.automatedactions;
   autumnblaze.commands = autumnblaze.text.commands;

   const connectionstatus = {
      discord: false,
      mongodb: false,
      runwhendone: () => {
         console.log("connected!!");
      }
   };
   autumnblaze.connectbot = () => {
      console.log("connecting to discord...");
      autumnblaze.bot.login(autumnblaze.opts.token).then(token => {
         // why did i do this? i really dont know
         token = "erased";
         if (token !== "erased") {
            console.warn("token not erased or smth idk lol, ignore this lol");
            console.warn("if this pops up then something is def wrong");
         }
         console.log("connection to discord success!!");
         connectionstatus.discord = true;
         if (connectionstatus.mongodb) connectionstatus.runwhendone();
         autumnblaze.hcooldown = (1000 * 30);
         autumnblaze.h = Date.now() - autumnblaze.hcooldown;
      }).catch(err => {
         console.log("connection failed lol");
         console.log(err);
         process.exit(1);
      });
      return autumnblaze;
   };
   let dbserv;
   autumnblaze.connectdb = () => {
      console.log("connecting to mongodb...");
      require("./mango")(autumnblaze.opts.mongodbconnectionstring, autumnblaze.opts.usecache).then(val => {
         autumnblaze.db = val[0].db(autumnblaze.opts.database);
         dbserv = val[0];
         autumnblaze.mango = val[1];
         autumnblaze.defaultguildsettings = autumnblaze.mango.defaultconfigs.defaultguildsettings;
         autumnblaze.defaultusersettings = autumnblaze.mango.defaultconfigs.defaultusersettings;
         console.log("connection to mongodb success!!");
         connectionstatus.mongodb = true;
         if (connectionstatus.discord) connectionstatus.runwhendone();
      }).catch(errrrr=> {
         console.log(errrrr);
      });
      return autumnblaze;
   };
   autumnblaze.connect = () => {
      console.log("running autumnblaze v" + autumnblaze.version);
      const rv = autumnblaze.connectbot().connectdb();
      // const intervallol = setInterval(() => {
      //    if (connectionstatus.discord && connectionstatus.mongodb) {
      //       connectionstatus.runwhendone();
      //       clearInterval(intervallol);
      //    } else console.log("noop");
      // }, 500);
      return rv;
   };
   const stop = async () => {
      if (autumnblaze.isrubbish) return;

      console.log("disconnecting...");
      autumnblaze.bot.destroy();
      console.log("disconnected from discord");
      if (autumnblaze.opts.usecache) autumnblaze.mango.dump(autumnblaze).then(() => {
         stopmango().then(() => console.log("disconnected from mongodb"));
      });
      else stopmango().then(() => console.log("disconnected from mongodb"));

      autumnblaze.isrubbish = true;
      console.log("disconnected!");
   };
   const stopmango = async () => {
      return new Promise(resolve => {
         dbserv.close(false, () => {
            resolve();
         });
      });
   };
   autumnblaze.stop = stop;
   process.on("SIGINT", stop);
   process.on("SIGTERM", stop);
   process.on("exit", stop);

   return autumnblaze;
};

module.exports = autumnblaze;
