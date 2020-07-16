module.exports = (msg) => {
   const allperms = require("discord.js").Permissions.FLAGS;
   const hasperms = [];

   for (const perm in allperms) if (msg.member.hasPermission(perm)) hasperms.push(perm);
   return hasperms;
}
