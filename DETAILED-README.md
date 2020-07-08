# detailed readme
i assume you come here for more details

## all config options
```js
{
   token: "your_bot_token",
   mongodbconnectionstring: "your_mongodb_connection_string",
   mongodatabase: "autumnblazebot",
   prefix: "autumn ",
   radiostreamurl: "http://fancynoise.xyz:8000/radio",
   debug: false
}
```

### what they mean
- token: your bot token. **for example: `XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX`**
- mongodbconnectionstring: the connection string used to connect to your mongodb server. **for example: `mongodb+srv://username:passwordd@databaseurl.example.com/etcetcetc?etc=etc&etc=etc`**
- mongodatabase: the name of the database to use for the bot. Assume that the bot can/will take over this entire database, so there better not be anything else in here. **default: `autumnblazebot`**
- prefix: the prefix to use for the bot. eventually when custom prefixes are available and the guild didnt setup a custom prefix, use this instead. **default: `autumn `**
- radiostreamurl: a link to an audio stream, for use in the eventual radio functionality. confirmed working audio stream formats (consult [discord.js documentation](https://discord.js.org/#/docs)): ogg. **default: `http://fancynoise.xyz:8000/radio`**
- debug: whether or not to log debug messages. **default: false**

## contributing
create an issue [here](https://github.com/pcelestia/autumnblaze/issues/new)!
