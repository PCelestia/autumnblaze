module.exports = message => {
   if (message.content.toLowerCase().split(/ +/).includes("hi")) message.channel.send("Hello!");
};
