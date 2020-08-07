"use strict";

module.exports = async (message, config, autumnblaze) => {
   let sentcmd = message.content;
   const dm = message.channel.type === "dm";

   if (!dm) {
      if (sentcmd.toLowerCase().startsWith(config.prefix.toLowerCase())) sentcmd = sentcmd.substring(config.prefix.length);
      else return;
   } else if (config.___isnew) await message.channel.send(newuserdmmsg).catch(console.warn);

   sentcmd = autumnblaze.randutils.getsubcmd(sentcmd);
   if (sentcmd[0] === "empty") return;
   if (autumnblaze.commands[sentcmd[1]]) {
      if (dm && !autumnblaze.commands[sentcmd[1]].allowdm) return message.channel.send("command not found").catch(console.warn);
      if (!dm && !autumnblaze.commands[sentcmd[1]].allowguild) return;
      if (autumnblaze.commands[sentcmd[1]].usetyping) message.channel.startTyping();
      Promise.resolve(execcmd(autumnblaze, sentcmd[1], sentcmd[2], message, dm, config)).then(val => {
         if ((val !== undefined) && (val !== "")) {
            if (Array.isArray(val)) {
               let i = 0;
               const interval = setInterval(() => {
                  message.channel.send(val[i++]).catch(console.warn);
                  if (i === val.length) clearInterval(interval);
               }, 1100);
               return;
            }
            // other special cases and things here (later)
            message.channel.send(val).catch(console.warn);
         }
      }).catch(val => {
         if (val) {
            if (val.send === true) {
               message.channel.send(val.content).catch(console.warn);
               if (val.logcontent) console.warn(val.logcontent);
               else console.warn(val.content);
            } else {
               message.channel.send("sorry, something went wrong...\nI've saved a report, my creaters will figure out what went wrong and fix it!");
               console.warn(val);
            }
         } else {
            message.channel.send("sorry, something went wrong...");
            console.warn("something went wrong, idk what since no error generated");
         }
      }).finally(() => {
         if (autumnblaze.commands[sentcmd[1]].usetyping === true) message.channel.stopTyping();
      });
   } else if (dm) message.channel.send("command not found");
};

const execcmd = async (autumnblaze, cmd, arg, msg, dm, config) => {
   if (autumnblaze.commands[cmd].perms) if (autumnblaze.commands[cmd].perms.length > 0) await autumnblaze.randutils.hasperms(msg, ...autumnblaze.commands[cmd].perms);
   return await autumnblaze.commands[cmd](arg, msg, autumnblaze, dm, config);
};

const newuserdmmsg = "Hello!\nUnlike most other bots, I actually respond to DMs. In here, you can run some commands that don't require a guild to run.\nSince there is no other use for this DM channel, I will treat every message sent as a command, and there is also no need to use a prefix in this channel.";
