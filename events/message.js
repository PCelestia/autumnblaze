const handler = (message, autumnblaze) => {
   autumnblaze.text.processmessage(message, autumnblaze);
};
handler.params = ["message", "autumnblaze"];
module.exports = handler;
