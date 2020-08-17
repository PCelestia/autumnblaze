module.exports = async autumnblaze => async () => {
   // TEMPORARY
   autumnblaze.bot.user.setPresence({
      status: "online",
      afk: false,
      activity: {
         name: "PING ME LOL"
      }
   }).catch(console.error);
   // END TEMPORARY
};
