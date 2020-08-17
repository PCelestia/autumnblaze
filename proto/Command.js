"use strict";

function Command(opts) {
   // proto Command
   if (!opts.exec) console.error("no execution function provided for a command");
   if (opts.allowdm) this.allowdm = opts.allowdm;
   if (opts.allowguild) this.allowguild = opts.allowguild;
   if (opts.perms) this.perms = opts.perms;
   if (opts.showinhelp) this.showinhelp = opts.showinhelp;
   if (opts.description) this.description = opts.description;
   if (opts.category) this.category = opts.category;
   if (opts.usetyping) this.usetyping = opts.usetyping;
}
Command.prototype.allowdm = false;
Command.prototype.allowguild = false;
Command.prototype.perms = [];
Command.prototype.showinhelp = false;
Command.prototype.description = "no description available";
Command.prototype.category = "other";
Command.prototype.usetyping = false;
Command.prototype.exec = () => "something went wrong, sorry about that";
module.exports = Command;
