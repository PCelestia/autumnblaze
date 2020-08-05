module.exports = (message, _, autumnblaze) => {
   if (message.content.toLowerCase().split(/ +/).includes("hi")) message.channel.send(autumnblaze.randutils.randfromarray(["Hello!", "Hi", "Welcome back", "Hey, how are you today?"]));
};
