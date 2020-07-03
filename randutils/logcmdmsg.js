module.exports = msg => {
   return "command[" + msg.content + "]" + " author[" + msg.author.username + "#" + msg.author.discriminator + "][" + msg.author.id + "] guild[" + msg.guild + "] channel[" + msg.channel + "]";
};
