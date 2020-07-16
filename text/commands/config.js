"use strict";

const thecmd = (cmd, msg) => {
   return new Promise((resolve, reject) => {
      const { updateservconfig } = require("../../mango");
      const autumnblaze = require("../../lebottieinitthig");
      const discord = require("discord.js");
      const embed = new discord.MessageEmbed();
      embed.setColor(autumnblaze.randutils.randfromarray(autumnblaze.opts.embedcolors));

      if (msg.channel.type === "dm") return resolve(embed.setTitle("Not allowed in DMs"));

      updateservconfig(autumnblaze.db, msg.channel.guild, { testt: cmd }, (success, err) => {
         if (msg.author.id !== "379800645571575810") return resolve(embed.setTitle("NO"));
         if (success) {
            embed.setTitle("Success");
            resolve(embed);
         } else {
            embed.setTitle("An error occured");
            reject(err);
         }
      });
   });
};

module.exports = thecmd;
