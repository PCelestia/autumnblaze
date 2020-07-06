const thecmd = cmd => {
   return "le test cmd 11 " + cmd;
};

thecmd.description = "this is a test command #1";
thecmd.showinhelp = true;

module.exports = thecmd;
