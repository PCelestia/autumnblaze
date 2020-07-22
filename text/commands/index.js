"use strict";
// and help

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

const fs = require("fs");
const path = require("path");

const cmds = {};

cmds._process = require("./_process");
const determinecategories = () => {
   const categories = [];
   for (const cmdhandler in cmds) {
      // if _process or "" or smth skip it
      if ((cmdhandler.charAt(0) === "_") || (cmdhandler === "")) continue;

      const category = cmds[cmdhandler].category;
      // if cmd.category is undefined skip it
      if (category === undefined) continue;
      // if category already exists
      if (categories.includes(category)) {
         categories[category].push(cmdhandler);
         continue;
      }
      categories.push(category);
      categories[category] = [];
      categories[category].push(cmdhandler);
   }
   return categories;
};

// automatically read all files from this directory
const commandfiles = fs.readdirSync(path.resolve(__dirname, ".")).filter(file => file.endsWith(".js") && file !== "index.js" && file !== "_process.js");
commandfiles.forEach(cmd => {
   const cmdnoext = cmd.slice(0, cmd.length - 3);
   cmds[cmdnoext] = require("./" + cmd);
});

// ping (useful ping thou lol)
// query
// list
// togglerole

const help = async cmd => {
   if (!cmds._categories) cmds._categories = determinecategories();

   const discord = require("discord.js");
   const autumnblaze = require("../../lebottieinitthig");
   const randfromarray = autumnblaze.randutils.randfromarray;
   const colors = autumnblaze.opts.embedcolors;
   const categories = cmds._categories;
   const embed = new discord.MessageEmbed();

   embed.setColor(randfromarray(colors));

   if (cmd === "") {
      embed.setTitle("Command Help");
      embed.setDescription("to get help on commands in a category, run the command shown below");
      categories.forEach((category) => {
         embed.addField(category, "`" + autumnblaze.opts.prefix + "help " + category + "`", true);
      });

      const app = await autumnblaze.bot.fetchApplication();
      if (autumnblaze.opts.reponame) embed.setFooter(autumnblaze.opts.reponame + " v", autumnblaze.version, app.iconURL(64));
      else embed.setFooter("pcelestia/autumnblaze v" + autumnblaze.version, app.iconURL(64));
      return embed;
   }
   // cmd has an arg
   if (!categories[cmd]) return embed.setTitle("category not found");
   else return embed.setTitle("success but not implemented yet lol");
   // return categories[cmd];
};
help.allowdm = true;
help.allowguild = true;
cmds.help = help;

module.exports = cmds;
