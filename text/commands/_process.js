"use strict";

module.exports = async (message, config, autumnblaze) => {
   // get out contents
   let sentcmd = message.content;
   const dm = message.channel.type === "dm";

   if (!dm) {
      if (sentcmd.toLowerCase().startsWith(config.prefix.toLowerCase())) sentcmd = sentcmd.substring(config.prefix.length);
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
         respond(cmd, sentcmd, message, autumnblaze, dm, config);
         return;
      } else {
         if (autumnblaze.commands[cmd].allowguild !== true) continue;
         // is guild, allowed to run in guild
         respond(cmd, sentcmd, message, autumnblaze, dm, config);
         return;
      }
   }
   // dm: check if cmd allowed to run in dm, then run
   // not dm: check if cmd allowed to run in guild, check perms, then run
   if (dm) await message.channel.send("command not found\nIf you're trying to use a prefix, there is no need to use a prefix in DMs.").catch(console.warn);
};

const respond = async (cmd, arg, msg, autumnblaze, dm, config) => {
   // if perms prop, check it, if none, assume everyone allowed to use it

   if (autumnblaze.commands[cmd].usetyping === true) msg.channel.startTyping();
   Promise.resolve((async () => {
      // let perms = true;
      if (autumnblaze.commands[cmd].perms !== undefined) if (autumnblaze.commands[cmd].perms.length > 0) {
         // hasperms() throws if not enough perms
         // perms = await autumnblaze.randutils.hasperms(msg, ...autumnblaze.commands[cmd].perms);
         await autumnblaze.randutils.hasperms(msg, ...autumnblaze.commands[cmd].perms);
      }
      return autumnblaze.commands[cmd](arg, msg, autumnblaze, dm, config);
   })()).then(val => {
      if ((val !== undefined) && (val !== "")) {
         if (Array.isArray(val)) {
            // send the message bit by bit
            console.log("Arr");
            let i = 0;
            const interval = setInterval(() => {
               msg.channel.send(val[i]).catch(console.warn);
               i++;
               if (i === val.length) clearInterval(interval);
            }, 1000);
            return;
         }
         msg.channel.send(val).catch(console.warn);
      }
   }).catch(val => {
      if (val) {
         if (val.send === true) {
            msg.channel.send(val.content).catch(console.warn);
            if (val.logcontent) console.warn(val.logcontent);
            else console.warn(val.content);
         } else {
            msg.channel.send("sorry, someething went wrong...");
            console.warn(val);
         }
      } else console.warn("something went wrong, idk what since no err generated");
   }).finally(() => {
      if (autumnblaze.commands[cmd].usetyping === true) msg.channel.stopTyping();
   });
};
