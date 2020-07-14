// and help
"use strict";

// this file contains the function that processes the commands.
// prefix and top level command has been removed already (only args/subcommands remain):
// if user typed "autumn help", the command that is processed is ""
// "autumn togglerole mc-announcements" becomes "mc-announcements"

// cmds.help = command handler
// cmds.description = command description
// cmds.usage = usage of the command

// return value: string
// rv.dm = boolean (whether or not the response should be sent in dm)

// ------OR--------
// return value: object
// rv.dm = string (message to send in dm)
// rv.guildchannel = string (message to send to channel in guild)

// example: person does "autumn help"
// bot responds with "check your dms"
// bot dms user with the help message

const cmds = {};

cmds._process = require("./_process");
const determinecategories = () => {
   const categories = [];
   for (const cmdhandler in cmds) {
      if ((cmdhandler.charAt(0) === "_") || (cmdhandler === "")) continue;
      if (cmds[cmdhandler].category === undefined) continue;
      if (categories.includes(cmds[cmdhandler].category)) continue;
      categories.push(cmds[cmdhandler].category);
   }
   return categories;
};
// tmp test cmds
cmds.test1 = require("./test1");
cmds.test2 = require("./test2");
cmds.test3 = require("./test3");
// proper below here
cmds.ping = require("./ping");
cmds.about = require("./about");

// ping (useful ping thou lol)
// query
// list
// togglerole

const help = async cmd => {
   if (!cmds._categories) cmds._categories = determinecategories();

   const { version } = require("../../package.json");
   const { randfromarray } = require("../../randutils");
   const discord = require("discord.js");
   const autumnblaze = require("../../lebottieinitthig");
   const colors = autumnblaze.opts.embedcolors;
   const categories = cmds._categories;
   const embed = new discord.MessageEmbed();

   embed.setColor(randfromarray(colors));

   if (cmd === "") {
      embed.setTitle("Command Help");
      categories.forEach((category) => {
         embed.addField(category, "`" + autumnblaze.opts.prefix + "help " + category + "`", true);
      });

      const app = await autumnblaze.bot.fetchApplication();
      if (autumnblaze.opts.reponame) embed.setFooter(autumnblaze.opts.reponame + " v", version, app.iconURL(64));
      else embed.setFooter("pcelestia/autumnblaze v" + version, app.iconURL(64));
      return embed;
   }
   // handle arg cmd thing here
   // for (const cmdhandler in cmds) if (cmds[cmdhandler])
};

cmds.help = help;

module.exports = cmds;
