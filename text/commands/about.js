"use strict";

const thecmd = async cmd => {
   const { version } = require("../../package.json");
   const { randfromarray } = require("../../randutils");
   const discord = require("discord.js");
   const autumnblaze = require("../../lebottieinitthig");
   const colors = autumnblaze.opts.embedcolors;
   const embed = new discord.MessageEmbed();

   embed.setColor(randfromarray(colors));

   embed.setTitle("About");

   let desc = "another general purpose discord bot\n";
   desc = desc + "written by <@379800645571575810>";

   if (autumnblaze.opts.host) desc = desc + ", hosted by " + autumnblaze.opts.host;
   else desc = desc + ", running";

   desc = desc + " as " + autumnblaze.bot.user.username + "#" + autumnblaze.bot.user.discriminator;
   if (autumnblaze.opts.location) desc = desc + "\nhosted in " + autumnblaze.opts.location;
   desc = desc + "\nGitHub repository: [pcelestia/autumnblaze](https://github.com/pcelestia/autumnblaze/ \"GitHub repository\")";
   if (cmd !== "") desc = desc + "\nalso i got the rest, it just doesnt do anything ~~yet~~";
   embed.setDescription(desc);

   const app = await autumnblaze.bot.fetchApplication();
   if (autumnblaze.opts.reponame) embed.setFooter(autumnblaze.opts.reponame + " v", version, app.iconURL(64));
   else embed.setFooter("pcelestia/autumnblaze v" + version, app.iconURL(64));

   return embed;
};

thecmd.description = "displays \"useful\" information about this bot";
thecmd.showinhelp = true;
thecmd.category = "misc";
thecmd.allowdm = true;
thecmd.allowguild = true;

module.exports = thecmd;
