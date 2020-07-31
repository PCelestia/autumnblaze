module.exports = autumnblaze => {
   return () => {
      console.log("discord session invalidated, automatically disconnected");
      autumnblaze.connectionstatus.discord = false;
      autumnblaze.stopmango();
   };
};
