"use strict";

const thecmd = async cmd => {
   const { version } = require("../../package.json");
   const colors = ["#FBFBDE", "#C7C497", "#C86120", "#E5C00D", "#FFEC6F", "#C7C497", "#4DFFFF"];
   const { randfromarray } = require("../../randutils");
   const discord = require("discord.js");
   const autumnblaze = require("../../lebottieinitthig");
   const embed = new discord.MessageEmbed();

   embed.setColor(randfromarray(colors));

   embed.setTitle("About");

   let desc = "another general purpose discord bot\n";
   desc = desc + "written by <@379800645571575810>";

   if (autumnblaze.opts.operatoruserid) desc = desc + ", hosted by <@" + autumnblaze.opts.operatoruserid + ">";
   else desc = desc + ", running";

   desc = desc + " as " + autumnblaze.bot.user.username + "#" + autumnblaze.bot.user.discriminator;
   if (cmd !== "") desc = desc + "\nalso i got the rest, it just doesnt do anything ~~yet~~";
   embed.setDescription(desc);

   const app = await autumnblaze.bot.fetchApplication();
   if (autumnblaze.opts.reponame) embed.setFooter(autumnblaze.opts.reponame + " v", version, app.iconURL(64));
   else embed.setFooter("pcelestia/autumnblaze v" + version, app.iconURL(64));

   return embed;
};

thecmd.description = "displays \"useful\" information about this bot";
thecmd.showinhelp = true;

module.exports = thecmd;
