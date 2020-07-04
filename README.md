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
   defaultcmdprefix: "autumn ",
   radiostreamurl: "http://fancynoise.xyz:8000/radio"
}
```

### what they mean
- token: your bot token.
  for example: `XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX`
- mongodbconnectionstring: the connection string used to connect to your mongodb server.
  for example: `mongodb+srv://username:passwordd@databaseurl.example.com/etcetcetc?etc=etc&etc=etc`
- mongodatabase: the name of the database to use for the bot. Assume that the bot can/will take over this entire database, so there better not be anything else in here.
  default: `autumnblazebot`
- defaultcmdprefix: for guilds that don't have a custom prefix setup, use this instead.
  default: `autumn `
- radiostreamurl: a link to an audio stream, for use in the eventual radio functionality
  confirmed audio stream formats: ogg
  default: `http://fancynoise.xyz:8000/radio`

## other stuffs
- more config options available soonish
- current version of the bot (used in [L&T Discord Server](https://love-tolerance.com/discord)) is closed source because the way i wrote it required the bot token to be committed, this is the rewrite
- rewriting because the current bot has a lot of design flaws (including committing the token)
- this does nothing right now so dont bother installing it lol
- my hosted bot *may* be opened to public use in the future (probably not though, since i dont have money lol)
