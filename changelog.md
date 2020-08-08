# Changelog
Will add changelog for older version when i have the chance

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

Bugs fixed:
- none
