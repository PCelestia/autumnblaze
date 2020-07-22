"use strict";

module.exports = async (message, autumnblaze) => {
   // ignore thyself
   if (message.author === autumnblaze.bot.user) return;

   // get out contents
   let sentcmd = message.content;

   // see if dm
   const dm = message.channel.type === "dm";
   if (!dm) {
      // (try to) remove prefix if guild
      const prefix = await new Promise((resolve, reject) => {
         autumnblaze.mango.getservconfig(autumnblaze.db, message.guild, servconfig => {
            if (servconfig === undefined) return reject("failed to create/get server config");
            if (servconfig.prefix === undefined) return resolve(autumnblaze.opts.prefix);
            resolve(servconfig.prefix);
         }, autumnblaze.defaultguildsettings);
      });
      if (autumnblaze.randutils.botpinged(message)[0]) {
         let pingstring = "i see i've been pinged\n";
         pingstring = pingstring + "my prefix here is `" + prefix + "`, for example `" + prefix + "help`";
         message.channel.send(pingstring);
      }
      if (sentcmd.startsWith(prefix)) sentcmd = sentcmd.substring(prefix.length);
      else return;
   }
   for (const cmd in autumnblaze.commands) {
      // process sentcmd, if it ain't then continue
      if (sentcmd.substring(0, cmd.length + 1) === (cmd + " ")) sentcmd = sentcmd.substring(cmd.length + 1);
      else if (sentcmd === cmd) sentcmd = "";
      else continue;

      if (dm) {
         if (autumnblaze.commands[cmd].allowdm !== true) continue;
         // is dm, allowed to run in dm
         respond(cmd, sentcmd, message, autumnblaze);
         return;
      } else {
         if (autumnblaze.commands[cmd].allowguild !== true) continue;
         // is guild, allowed to run in guild
         respond(cmd, sentcmd, message, autumnblaze);
         return;
      }
   }
   // dm: check if cmd allowed to run in dm, then run
   // not dm: check if cmd allowed to run in guild, check perms, then run
   if (dm) cmdnotfound(message).catch(console.warn);
};

const cmdnotfound = async (msg) => {
   msg.channel.startTyping();
   await msg.channel.send("command not found");
   msg.channel.stopTyping();
};

const respond = async (cmd, arg, msg, autumnblaze) => {
   // if perms prop, check it, if none, assume everyone allowed to use it

   msg.channel.startTyping();
   Promise.resolve((async () => {
      // let perms = true;
      if (autumnblaze.commands[cmd].perms !== undefined) if (autumnblaze.commands[cmd].perms.length > 0) {
         // hasperms() throws if not enough perms
         // perms = await autumnblaze.randutils.hasperms(msg, ...autumnblaze.commands[cmd].perms);
         await autumnblaze.randutils.hasperms(msg, ...autumnblaze.commands[cmd].perms);
      }
      return autumnblaze.commands[cmd](arg, msg);
   })()).then(val => {
      if ((val !== undefined) && (val !== "")) msg.channel.send(val).catch(console.warn);
   }).catch(val => {
      if (val) if (val.send === true) msg.channel.send(val.content).catch(console.warn);
      else console.warn(val);
   }).finally(() => {
      msg.channel.stopTyping();
   });
};

// autumn config set prefix `autumn `
