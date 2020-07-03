# autumnblaze
a discord moderation bot. i wrote my own because i don't feel really satisfied with existing bots, and so i know the ins and outs of it and can customise it to my needs. also its sort of a fun project!

## requirements
`node.js` and `npm` required. i have `npm 6.14.5` and `node v14.4.0` installed, but i think `12.18.2 LTS` and `14.5.0 Current` (as well as all future "current" and "LTS" versions) will work. this bot programmed using [discord.js](https://discord.js.org) and [MongoDB](https://mongodb.com) for the database.

## very basic use
1. create a node project with `npm init`, or create your own package.json
2. `npm install PCelestia/autumnblaze`
3. create `index.js`
4. get a bot account (and token) at [the discord developer website](https://discord.com/developers), google how to if you dont know how
   the gist of it: create an application, click "bot" on the sidebar thing, then create a bot. click "copy" to copy your token
5. stick this inside `index.js` (eventually when it actually does something)
PRACTICALLY REQUIRED: also include a mongodb connection string. This allows for the bot's customisability, and to store data. i don't think the bot can operate without connecting to a database.
```js
require("autumnblaze")({
   token: "your_bot_token",
   mongodbconnectionstring: "your_mongodb_connection_string"
});
```
6. open a new terminal window (bash, windows powershell, windows cmd, whatever has node in it), run `node index.js`. keep that terminal window open. to stop it, do `ctrl+c`.

## all config options
```js
{
   token: "your_bot_token",
   mongodbconnectionstring: "your_mongodb_connection_string",
   mongodatabase: "autumnblazebot",
   defaultcmdprefix: "autumn "
}
```

## other stuffs
- more config options available soonish
- current bot (used in [L&T Discord Server](https://love-tolerance.com/discord)) is closed source because the way i wrote it required the bot token to be committed, this is the rewrite
- this does nothing right now so dont bother installing it lol
- my hosted bot *may* be opened to public use in the future (probably not though, since i dont have money lol)
