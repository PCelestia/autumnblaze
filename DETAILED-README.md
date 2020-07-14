# detailed readme
i assume you come here for more details

## all config options
**NOTE**: the only required options are `token` and `mongodbconnectionstring`. if you dont wish to modify an optional option, leave it out of the object.
```js
{
   token: "your_bot_token",
   mongodbconnectionstring: "your_mongodb_connection_string",
   mongodatabase: "autumnblazebot",

   prefix: "autumn ",
   radiostreamurl: "http://fancynoise.xyz:8000/radio",

   host: "<@379800645571575810>",
   location: "Cupertino, CA USA"

   embedcolors: ["#FBFBDE", "#C7C497", "#C86120", "#E5C00D", "#FFEC6F", "#C7C497", "#4DFFFF"],
   debug: false
}
```

### what they mean
- token: your bot token. **for example: `XXXXXXXXXXXXXXXXXXXXXXXX.XXXXXX.XXXXXXXXXXXXXXXXXXXXXXXXXXX`**
- mongodbconnectionstring: the connection string used to connect to your mongodb server. **for example: `mongodb+srv://username:passwordd@databaseurl.example.com/etcetcetc?etc=etc&etc=etc`**
- mongodatabase: the name of the database to use for the bot. Assume that the bot can/will take over this entire database, so there better not be anything else in here. **default: `autumnblazebot`**
- prefix: the prefix to use for the bot. eventually when custom prefixes are available and the guild didnt setup a custom prefix, use this instead. **default: `autumn `**
- radiostreamurl: a link to an audio stream, for use in the eventual radio functionality. confirmed working audio stream formats (consult [discord.js documentation](https://discord.js.org/#/docs)): ogg. **default: `http://fancynoise.xyz:8000/radio`**
- host: a string to represent who hosts this instance of the bot in the about command. it can be a discord mention string (for example `<@379800645571575810>`), or just plain text. if undefined, its not shown in the about embed. **default: undefined**
- location: a string to represent the location of the bot. if undefined, its not shown in the about embed. **default: undefined** (yes i live in cupertino, ~come track me down~)
- embedcolors: an array of hex color codes (with hash symbol "#"). when needed, the bot will pick one at random from this array to use. if you only want one color, pass a single-element array (for example `["#4DFFFF"]`). default: **["#FBFBDE", "#C7C497", "#C86120", "#E5C00D", "#FFEC6F", "#C7C497", "#4DFFFF"]**
- debug: whether or not to log debug messages. **default: false**

## contributing
create an issue [here](https://github.com/pcelestia/autumnblaze/issues/new)!
