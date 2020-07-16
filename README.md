# autumnblaze
another general purpose discord bot. i wrote my own because i don't feel really satisfied with existing bots, and so i know the ins and outs of it and can customise it to my needs. also its sort of a fun project!

this bot uses [discord.js](https://discord.js.org) and [MongoDB](https://mongodb.com).

you can view my plans and things for the bot at [my trello board thing](https://trello.com/b/6o7eZylC/autumnblaze-bot).

## requirements
`node.js` and `npm` required.

## very basic use
1. create a node project
2. `npm install PCelestia/autumnblaze`
3. create `index.js`
4. get a bot account (and token)
5. install [MongoDB](https://mongodb.com)/obtain a server. also get the connection string.
6. stick this inside `index.js`
```js
require("autumnblaze")({
   token: "your_bot_token",
   mongodbconnectionstring: "your_mongodb_connection_string"
}).connect();
```
7. run `index.js` using `node index.js`

## other stuffs
- more config options available soonish
- ~current version of the bot (used in [L&T Discord Server](https://love-tolerance.com/discord)) is closed source because the way i wrote it introduced a lot of design flaws (including committing the token)~ it has been retired and replaced with this!
- my hosted bot *may* be opened to public use in the future (probably not though, since i dont have money lol)
- more details: see [DETAILED-README.md](https://github.com/pcelestia/autumnblaze/blob/main/DETAILED-README.md)
