# autumnblaze

(eventually will be) the code behind Autumn Blaze#1324

## requirements
`node.js` and `npm` required. i have `npm 6.14.5` and `node v14.4.0` installed, but i think `12.18.2 LTS` and `14.5.0 Current` (as well as all future "current" and "LTS" versions) will work. this bot programmed using [discord.js](https://discord.js.org) and [MongoDB](https://mongodb.com) for the database.

## very basic use
1. create a node project with `npm init`, or create your own package.json
2. `npm install PCelestia/autumnblaze`
3. create `index.js`
4. get a bot account (and token) at [the discord developer website](https://discord.com/developers), google how to if you dont know how
   the gist of it: create an application, click "bot" on the sidebar thing, then create a bot. click "copy" to copy your token
5. stick this inside `index.js` (eventually when it actually does something)
```js
require("autumnblaze")({
   token: "your_bot_token"
});
```
6. open a new terminal window (bash, windows powershell, windows cmd, whatever has node in it), run `node index.js`. keep that terminal window open. to stop it, do `ctrl+c`.

## more config options
will be put here as they come in. i shall also put some docs as i feel is needed

## other stuffs
- more config options available soonish
- current bot (used in [L&T Discord Server](https://love-tolerance.com/discord)) is closed source because the way i wrote it required the bot token to be committed, working to rewrite it better
- this does nothing right now so dont bother installing it lol
- my hosted bot *may* be opened to public use in the future (probably not though, since i dont have money lol)
