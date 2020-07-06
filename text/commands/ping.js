const thecmd = cmd => {
   return require("../../randutils").randfromarray(["Pong!", "Plonkee!", "<:lurk:709864149173403781>", "okie then", "plongz"]);
};

thecmd.description = "Pling mee";

module.exports = thecmd;
