module.exports = (message, autumnblaze) => {
   // if cant find nsfw, its dm, reply with "dms off'D"
   // BUT only if the author isn't the bot lol
   if (!(message.nsfw === undefined) && (message.author != autumnblaze.bot.user)) {
      // dm!
      message.channel.send("direct messages don't do anything (yet lol)");
   }

   // if no prefix, get out
   if (!(message.content.substring(0, autumnblaze.opts.prefix.length) === autumnblaze.opts.prefix)) return;

   autumnblaze.commands._process(message, autumnblaze);
};
