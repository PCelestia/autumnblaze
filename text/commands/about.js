"use strict";

let embed = undefined;
const thecmd = async (cmd, _, autumnblaze) => {
   if (embed !== undefined) {
      embed.setColor(autumnblaze.randutils.randfromarray(autumnblaze.opts.embedcolors));
      return embed;
   }
   embed = await autumnblaze.randutils.embed();

   embed.setTitle("About");

   let desc = "another general purpose discord bot\n";
   desc = desc + "written by <@379800645571575810>";

   if (autumnblaze.opts.host) desc = desc + ", hosted by " + autumnblaze.opts.host;
   else desc = desc + ", running";

   desc = desc + " as " + autumnblaze.bot.user.username + "#" + autumnblaze.bot.user.discriminator;
   if (autumnblaze.opts.location) desc = desc + "\nhosted " + autumnblaze.opts.location;
   // desc = desc + "\nGitHub repository: [pcelestia/autumnblaze](https://github.com/pcelestia/autumnblaze/ \"GitHub repository\")";
   if (cmd !== "") desc = desc + "\nalso i got the rest, it just doesnt do anything ~~yet~~";
   embed.setDescription(desc);

   return embed;
};

thecmd.description = "displays \"useful\" information about this bot";
thecmd.showinhelp = true;
thecmd.category = "other";
thecmd.allowdm = true;
thecmd.allowguild = true;

module.exports = thecmd;
