module.exports = msg => {
   return "[" + msg.content + "]" + " sent by [" + msg.author + "] in guild " + msg.guild + " channel " + msg.channel;
};
