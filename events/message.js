const handler = (autumnblaze, message) => {
   autumnblaze.text.processmessage(message, autumnblaze);
};
handler.params = ["message", "autumnblaze"];
module.exports = handler;
