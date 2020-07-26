module.exports = async autumnblaze => {
   // console.log("dumpppppppp");
   // // temp dump everything to console
   // const cache = require("./_cache");
   // for (const key1 in cache) for (const key2 in cache[key1]) for (const key3 in cache[key1][key2]) {
   //    console.log(key1 + "." + key2 + "." + key3 + ": " + cache[key1][key2][key3]);
   //    if (key3 === "the") for (const key4lol in cache[key1][key2][key3]) console.log("key4444." + key4lol + "." + cache[key1][key2][key3][key4lol]);
   // }

   console.log("dumping everything...");
   const cache = require("./_cache");
   for (const collection in cache) for (const doc in cache[collection]) {
      const cacheentry = cache[collection][doc];
      if (cacheentry.needsupdate) {
         // needs updating, use regular since cache just puts in cache lol
         // since we dont have a guild, we can fake one lol
         const fakeguild = { id: collection };
         require("./updateservconfig")(autumnblaze.db, fakeguild, cache[collection][doc].the, success => {
            if (!success) console.log("dump failed somewhere");
         });
      }
   }
   console.log("done");
};
