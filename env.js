"use strict";

require("dotenv").config();
const configobj = {};
const availablevars = [
   "TOKEN",
   "MONGODBCONNECTIONSTRING",
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
require("./lebottieinitthig")(configobj).connect();
