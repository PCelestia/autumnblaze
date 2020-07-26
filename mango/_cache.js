"use strict";
// cache thing so that i dont have to constantly query the database every two seconds

// cache = {
//    guildid: {
//       guildsettings: {
//          lastupdate: some time in ms
//          needsupdate: boolean, true when update made, false when mongo is updated
//          the: the guild obj
//       },
//       "userid": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: their object
//       },
//       "another user id": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: their object
//       }
//    },
//    "user" + userid: {
//       "usersettings": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: user settings obj
//       },
//       "list etc": {
//          lastupdate: some time in ms
//          needsupdate: bool
//          the: user settings obj
//       }
//    }
// }

// here it is... lol
module.exports = {};
