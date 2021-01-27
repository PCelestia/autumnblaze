# Changelog

Might add changelog for older version when i have the chance

## 0.19.0

New:

- boop mlem bap etc lol
- a voice radio thing! (overcomplicated lol)

Changes:

- migrated to typescript!
- not all commands are in yet, currently only the pony and help commands made it

## 0.18.3

Changes:

- updated some packages

## 0.18.2

Changes:

- shortened some code that could be more concise

## 0.18.1

Changes:

- increased h cooldown to 2 minutes from 30 seconds
- removed typing indicator for h

## 0.18.0

New:

- say command, and the bot gets mad at you gradually as you keep trying to make it swear
- compliment command, pulls generated compliments from `https://complimentr.com/api`

Changes:

- renamed automatedactions to modules (because thats what it should have been)
- command handlers now have access to user config when command sent in a guild
- misc improvements to pony command

## 0.17.1

Changes:

- lebottieinitthig.js => index.js (no more strange names!)
- wait for database to connect before connecting bot
- help command only shows commands available in the channel where the help command is sent
- store top level help command embed (like about), no reason to rebuild it everytime
- move presence (game activity) to events/ready module
- remove extra file (env.js), just run index.js
- start transition to prototype based system, added Command prototype
- command now standard object, run cmd.exec() instead

## 0.17.0

New:

- not really new, but `enable` and `diable` commands now actually enabled

Changes:

- misc management improvements

Bugs fixed:

- when disconnecting temporarily, bot doesnt restore status on reconnect

## 0.16.2

Changes:

- rewrote member welcome a bit, likely handles promise rejection a bit better

## 0.16.1

Changes:

- rewrote patchconsole
- send promise rejections to the error channel

## 0.16.0

New:

- introduce users to how the bot responds to dms (on first dm sent)
- store all pony image metadata into a collection in the db
- welcome message module (but without the command to enable it yet)

Changes:

- rewrote command processing thing to be more concise, less messy, and probably faster
- remove "in" from the about command, if you want "in" inside the hosting location in the about command, put that into opts.location
- dont require derpibooru api key, since doesnt use the derpibooru api (for now at least)
