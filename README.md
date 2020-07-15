# autumnblaze
another general purpose discord bot. i wrote my own because i don't feel really satisfied with existing bots, and so i know the ins and outs of it and can customise it to my needs. also its sort of a fun project!

this bot uses [discord.js](https://discord.js.org) and [MongoDB](https://mongodb.com).

you can view my plans and things for the bot at [my trello board thing](https://trello.com/b/6o7eZylC/autumnblaze-bot).

## requirements
`node.js` and `npm` required. tested and working on `npm 6.14.5` and `node v14.4.0`, but `12.18.2 LTS` and `14.5.0 Current` (as well as all future "current" and "LTS" versions) should work.

## very basic use
1. create a node project with `npm init`, or create your own package.json
2. `npm install PCelestia/autumnblaze`
3. create `index.js`
4. get a bot account (and token) at [the discord developer website](https://discord.com/developers), google how to do it if you dont know how
   the gist of it: create an application (blue button in top right corner of window) at [the discord developer site](https://discord.com/developers), click "bot" on the sidebar thing, then create a bot. click "copy" under the token section to copy your token
5. install [MongoDB](https://mongodb.com) if you don't have a server somewhere. make sure to start mongodb before the bot, so the bot can connect to it. If you have a server somewhere else, you probably already know what your connection string is. If you've just installed the server on the same computer as the bot, you're most likely fine with the default connection string.
6. stick this inside `index.js`
```js
require("autumnblaze")({
   token: "your_bot_token",
   mongodbconnectionstring: "your_mongodb_connection_string"
}).connect();
```
7. open a new terminal window (bash, windows powershell, windows cmd, whatever has node in it), run `node index.js`. there will be a console message `connection success!!` when connected. keep that terminal window open. to stop it, do `ctrl+c`. there will be a message `closey` when successfully closed.

## other stuffs
- more config options available soonish
- ~current version of the bot (used in [L&T Discord Server](https://love-tolerance.com/discord)) is closed source because the way i wrote it introduced a lot of design flaws (including committing the token)~ it has been retired and replaced with this!
- my hosted bot *may* be opened to public use in the future (probably not though, since i dont have money lol)
- more details: see [DETAILED-README.md](https://github.com/pcelestia/autumnblaze/blob/main/DETAILED-README.md)
