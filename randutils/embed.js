// makes a "default" embed with all the "standard" stuff filled in
let autumnblaze;
const thefn = async () => {
   const discord = require("discord.js");
   const embed = new discord.MessageEmbed();
   embed.setColor(autumnblaze.randutils.randfromarray(autumnblaze.opts.embedcolors));
   const app = await autumnblaze.bot.fetchApplication();
   if (autumnblaze.opts.reponame) embed.setFooter(autumnblaze.opts.reponame + " v" + autumnblaze.version, app.iconURL(64));
   return embed;
};

thefn.setup = param => autumnblaze = param;

module.exports = thefn;
