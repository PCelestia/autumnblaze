"use strict";
// cache thing so that i dont have to constantly query the database every two seconds

// if something isnt in the cache, get it
// if something is in the cache, use that instead
// everything just uses the cache
// a little setinterval task will come and update the server every so often and at shutdown
// cache = {
//    guildid: {
//       guildsettings: {
//          lastupdate: some time in ms
//          needsupdate: boolean, true when update made, false when mongo is updated
//          the: the guild obj
//          update: an object, starts empty, all updates applied onto this, in the end its this that is sent to the actual db
//       },
//       "userid": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: their object
//          update:
//       },
//       "another user id": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: their object
//          update:
//       }
//    },
//    "user" + userid: {
//       "usersettings": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: user settings obj
//          update:
//       },
//       "list etc": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: user settings obj
//          update:
//       }
//    }
// }

// here it is... lol
const cache = {};

// methods for manipulating the cache belowww
const fns = {};

fns.get = (key, thing) => {
   console.log("cache get");
   if (cache[key]) if (cache[key][thing]) return require("../randutils").copyobj(cache[key][thing].the);
   return undefined;
};
fns.update = (key, thing, update) => {
   console.log("cache update");
   // assume exists
   cache[key][thing].lastupdate = Date.now();
   cache[key][thing].needsupdate = true;
   for (const property in update) {
      cache[key][thing].update[property] = update[property];
      cache[key][thing].the[property] = update[property];
   }
};
fns.set = (key, thing, doc, needsupdate = false) => {
   console.log("cache set");
   if (!cache[key]) cache[key] = {};
   if (!cache[key][thing]) cache[key][thing] = {
      lastupdate: Date.now(),
      needsupdate: needsupdate,
      the: require("../randutils").copyobj(doc),
      update: {}
   };
};
fns.dump = () => {
   return new Promise((resolve, reject) => {
      console.log("dumpppppppp");
      // temp dump everything to console
      for (const key in cache) for (const thing in cache[key]) for (const cacheentryprop in cache[key][thing]) {
         console.log(key + "." + thing + "." + cacheentryprop + ": " + cache[key][thing][cacheentryprop]);
         if ((cacheentryprop === "the") || (cacheentryprop === "update")) for (const key4lol in cache[key][thing][cacheentryprop]) console.log("key4444." + key4lol + "." + cache[key][thing][cacheentryprop][key4lol]);
      }

      // console.log("dumping everything...");
      // for (const collection in cache) for (const doc in cache[collection]) {
      //    const cacheentry = cache[collection][doc];
      //    if (cacheentry.needsupdate) {
      //       // needs updating, use regular since cache just puts in cache lol
      //       // since we dont have a guild, we can fake one lol
      //       const fakeguild = { id: collection };
      //       require("./updateservconfig")(autumnblaze.db, fakeguild, cache[collection][doc].the, success => {
      //          if (!success) console.log("dump failed somewhere");
      //       });
      //    }
      // }
      console.log("done");
      resolve();
   });
};

module.exports = fns;
