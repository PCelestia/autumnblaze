// can only be used to copy objects without functions, if there is a fn it will be lost
module.exports = obj => {
   return JSON.parse(JSON.stringify(obj));
};
