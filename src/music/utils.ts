/* eslint-disable @typescript-eslint/no-magic-numbers */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */

import superagent from "superagent";
import { albums, getplayableurltest, getsongsfromalbumurltest } from "../consts";
import { JsonConvert, JsonObject, JsonProperty } from "json2typescript";
import { unescape } from "html-escaper";
import { Collection, VoiceBroadcast } from "discord.js";
import { AutumnBlaze } from "../bot";
import { Logger } from "winston";
import { getlogger } from "../rando";
const logger: Logger = getlogger("_voiceutil");

// for autojoin, for later when a db is connected
// export class VoiceThing {
//    private readonly autumnblaze: AutumnBlaze;
//    private readonly logger: Logger;
//
//    public constructor(autumblaze: AutumnBlaze) {
//       this.autumnblaze = autumblaze;
//       this.logger = getlogger("_music");
//
//       this.initautojoin();
//    }
//
//    private initautojoin(): void {
//       // this.autumnblaze.bot.on("voiceStateUpdate", (_oldstate, newstate) => {
//       //    this.logger.debug("voicestate update lol");
//       //    // if it was a join then newstate.channel is not null
//       //    newstate.channel
//       // });
//
//       // have manual join for now
//    }
//
//    private dojoin(): void {
//
//    }
//
//    private doleave(): void {
//
//    }
// }

/** one of many JsonObject classes written to extract data from bandcamp */
@JsonObject("BandcampTrackDetails") export class TrackDetails {
   /** duration of the song, for example P00H03M13S */
   @JsonProperty("duration", String) public duration: string = "";
   /** name of the song */
   @JsonProperty("name", String) public name: string = "";
   /** link to the song page (not playable url) */
   @JsonProperty("@id", String) public link: string = "";
}

/** one of many JsonObject classes written to extract data from bandcamp */
@JsonObject("BandcampTrack") export class Track {
   /** position of the track in the album */
   @JsonProperty("position", Number) public position: number = 0;
   /**
    * details of the track, type is {@link TrackDetails}
    *
    * note: i would make this easier if i could get the custom converter thing to work lol
    */
   @JsonProperty("item", TrackDetails) public details: TrackDetails = new TrackDetails();
}

/** one of many JsonObject classes written to extract data from bandcamp */
@JsonObject("BandcampTrackList") export class Tracklist {
   /** number of tracks in this album */
   @JsonProperty("numberOfItems", Number) public numberoftracks: number = 0;
   /** an array of tracks */
   @JsonProperty("itemListElement", [Track]) public tracks: Array<Track> = [];
}

/** one of many JsonObject classes written to extract data from bandcamp */
@JsonObject("BandcampAlbumArtist") export class AlbumArtist {
   /** name of the album artist */
   @JsonProperty("name", String) public name: string = "";
   /** link to the album artist */
   @JsonProperty("@id", String) public link: string = "";
}

/** one of many JsonObject classes written to extract data from bandcamp */
@JsonObject("BandcampAlbum") export class Album {
   /** a string list of keywords for this album (on bandcamp) */
   @JsonProperty("keywords", String) public keywords: string = "";
   // @JsonProperty("datePublished", String) public datepublished: Array<string> = [];
   // @JsonProperty("albumProductionType", String) public albumproductiontype: string = "";
   /** name of the album */
   @JsonProperty("name", String) public name: string = "";
   /** list of tracks from the album (yea its not an array, just following bandcamp's json schema thing because i can't get custom converters to work lol) */
   @JsonProperty("track", Tracklist) public tracklist: Tracklist = new Tracklist();
   /** link to the album */
   @JsonProperty("@id", String) public link: string = "";
   /** number of tracks in the album */
   @JsonProperty("numTracks", Number) public numberoftracks: number = 0;
   /** album cover link */
   @JsonProperty("image", String) public imagelink: string = "";
   /** album artist */
   @JsonProperty("byArtist", AlbumArtist) public albumartist: AlbumArtist = new AlbumArtist();
}

/**
 * gets a url to an audio stream from a bandcamp track link (eg ...bandcamp.com/track/...)
 *
 * @param url bandcamp url to get playable of
 * @returns false if error, url if success
 */
export async function getplayableurl(url: string): Promise<string | false> {
   const matches: RegExpMatchArray | null = getplayableurltest.exec((await superagent.get(url)).text);
   if (!matches || matches.length !== 1) return false;
   const escaped: string = unescape(matches[0]);
   return escaped.substring(0, escaped.length - 1);
}

/**
 * extracts a json string from an album url (...bandcamp.com/album/...)
 *
 * @param url the url to get from
 * @returns false if error, json (string) of data if success
 */
export async function getsongsfromalbumurl(url: string): Promise<string | false> {
   const matches: RegExpMatchArray | null = getsongsfromalbumurltest.exec((await superagent.get(url)).text);
   if (!matches || matches.length !== 1) return false;
   return unescape(matches[0].substring("<script type=\"application/ld+json\">".length, matches[0].length - "</script>".length).trim());
}

/**
 * takes an album json string and parses it into an {@link Album} instance
 *
 * @param json string of json
 * @returns Album instance if success
 * @throws error if json2typescript fails at the conversion
 */
export function parsealbumjson(json: string): Album {
   return new JsonConvert().deserializeObject(JSON.parse(json), Album);
}

/**
 * given an album url (...bandcamp.com/album/...), does all it needs to to get an array
 * of playable urls
 *
 * note: this needs to make a request for the album, and then one request per track to get
 * it. so this method may seem spammy to bandcamp. I recommend using {@link getsongsfromalbumurl}
 * and {@link parsealbumjson} to get the track urls, then get the playable urls as needed using
 * {@link getplayableurl}.
 *
 * @param url bandcamp album url
 * @returns false if error, string array of playable urls if success
 * @throws error if json2typescript fails at conversion
 */
export async function getplayableurlsfromalbum(url: string): Promise<Array<string> | false> {
   const json: string | false = await getsongsfromalbumurl(url);
   if (!json) return false;
   let parsedalbums: Album | Array<Album> = parsealbumjson(json);
   if (!(parsedalbums instanceof Array)) parsedalbums = [parsedalbums];

   const res: Array<string> = [];
   for (const album of parsedalbums) for (const track of album.tracklist.tracks) {
      const playable: string | false = await getplayableurl(track.details.link);
      if (playable) res.push(playable);
   }
   return res;
}

// /**
//  * grabs a bunch of playable urls from an album passed to it. not recommended, because
//  * could spam bandcamp with requests
//  *
//  * @param urls album urls to get playables from
//  * @returns promise, eventually resolve to an array of playable urls if success or false if failure
//  */
// export async function getlinksfromalbum(urls: ReadonlyArray<string>): Promise<Array<string> | false> {
//    const res: Array<string> = [];
//    for (const url of urls) {
//       const playableurls: Array<string> | false = await getplayableurlsfromalbum(url);
//       if (playableurls && playableurls.length > 0) res.push(...playableurls);
//    }
//    if (res.length === 0) return false;
//    else return res;
// }


/** queue of playable links (already shuffled) */
let queue: Array<string> | undefined = undefined;

/**
 * maps album number to an object with string keys (for example "5"), and
 * each key has its corresponding track.
 * albums and keys generated whole album at a time
 */
const songurls: Collection<string, { [key: string]: string }> = new Collection();

/** cache of album objects */
const albumobjects: Collection<string, Album> = new Collection();
// cache of playable urls (links to the actual audio stream)
// idk how i want to do the url invalidation or whatever lol
// maps
// const playableurlcache: Collection<string, string> = new Collection<string, string>();

/** makes a new queue. if there is an existing one, it is overwritten */
export function getnewqueue(): Array<string> {
   logger.debug("made new queue");
   const newqueue: Array<string> = [];
   for (let albumnum: number = 0; albumnum < albums.length; albumnum++) for (let songnum: number = 0; songnum < albums[albumnum].numberofsongs; songnum++) {
      newqueue.push(`${albumnum} ${songnum}`);
   }
   for (let h: number = newqueue.length - 1; h > 0; h--) {
      const hh: number = Math.floor(Math.random() * (h + 1));
      [newqueue[h], newqueue[hh]] = [newqueue[hh], newqueue[h]];
   }
   return newqueue;
}

/** used internally to store song links and data */
interface NextSongLink {
   url: string;
   playable: string;
   albumnum: string;
   songnum: string;
}

/**
 * gets the next song link from the queue
 *
 * @returns the next song's links and other data
 * @throws some error if for some reason it can't get a song link
 */
export async function getnextsonglink(): Promise<NextSongLink> {
   // gotta satisfy typescript ultra strict typing yk?

   logger.debug("getting next song link from queue");

   // try to get a song from the queue, make new if its empty or doesnt exist
   if (!queue || queue.length === 0) queue = getnewqueue();
   const nextsong: string | undefined = queue.shift();
   if (!nextsong) throw new Error("hmmmmmmmmmmmmmmmm queue isnt generating properly?");

   // get albumnumber and songnumber from song (which was from queue)
   const [albumnum, songnum] = nextsong.split(" ");

   let albumsongurls: { [key: string]: string } | undefined = songurls.get(albumnum);
   if (!albumsongurls) {
      songurls.set(albumnum, {});
      albumsongurls = songurls.get(albumnum);
      if (!albumsongurls) throw new Error("WROEIHOIHOIHWEROIHOWEIHR hhhhhhh");
   }
   if (!albumsongurls[songnum]) {
      const albumurl: string | false = await getsongsfromalbumurl(albums[Number(albumnum)].url);
      if (!albumurl) return await getnextsonglink(); // why is this here idk
      let album: Album | Array<Album> = parsealbumjson(albumurl);
      if (!(album instanceof Array)) album = [album];
      albumobjects.set(albumnum, album[0]);

      let h: number = 0;
      for (const track of album[0].tracklist.tracks) albumsongurls[`${h++}`] = track.details.link;
      if (!albumsongurls[songnum]) throw new Error("lskdjlkjdlkjfsldkjfslkdjlsdkjf something went wrong hhhhhhhhhhhhhhhhhhh");
   }

   const playableurl: string | false = await getplayableurl(albumsongurls[songnum]);
   if (playableurl) {
      logger.debug(`bandcamp link: ${albumsongurls[songnum]}`);
      logger.debug(`playable link: ${playableurl}`);
      return {
         url: albumsongurls[songnum],
         playable: playableurl,
         albumnum: albumnum,
         songnum: songnum
      };
   };
   throw new Error(`wtf hhhh theres no playable url for ${albumsongurls[songnum]}`);
}

/**
 * converts a time (ex "P00H03M13S") into a number of milliseconds (for use
 * in like setTimeout for example)
 *
 * @param timestr string of time (ex "P00H03M13S")
 * @returns number of millis this string represents
 */
export function converttime(timestr: string): number {
   // "duration": "P00H03M13S",
   const hours: number = Number(timestr.substring(1, 3));
   const minutes: number = Number(timestr.substring(4, 6));
   const seconds: number = Number(timestr.substring(7, 9));
   // eslint-disable-next-line @typescript-eslint/no-extra-parens
   return (seconds * 1000) + (minutes * 1000 * 60) + (hours * 1000 * 60 * 60);
}

/** represents no song lol */
export const nosong: NextSongLink = {
   albumnum: "-1",
   songnum: "-1",
   url: "",
   playable: ""
};

/**
 * manager thingie that manages a broadcast. It does all the complex stuff of
 * opening a broadcast if one doesn't exist, closing it if it is no longer used,
 * and handling playing songs from the queue. consumers of this manager thing only
 * has to worry about getting a brodcast from this manager and playing it to a connection.
 */
export class BroadcastManager {
   /** the broadcast if it exists */
   private broadcast?: VoiceBroadcast;
   /** the {@link AutumnBlaze} that instantiated this */
   private readonly autumnblaze: AutumnBlaze;
   /** logger for logging things */
   private readonly logger: Logger;
   /** now playing song data */
   private nowplayingsonglol: NextSongLink = nosong;
   /** getter, parses {@link this.nowplayingsonglol} and returns a {@link Track} object */
   public get nowplaying(): Track | undefined {
      return albumobjects.get(this.nowplayingsonglol.albumnum)?.tracklist.tracks[Number(this.nowplayingsonglol.songnum)];
   }
   /**
    * the timeout used to handle the automatic next playing song, since broadcast events
    * don't want to work
    */
   private timeout: NodeJS.Timeout | undefined = undefined;

   /**
    * construct one of these
    * @param autumnblaze the {@link AutumnBlaze} client thing that instantiated this
    */
   public constructor(autumnblaze: AutumnBlaze) {
      this.autumnblaze = autumnblaze;
      this.logger = getlogger("_voice");
      this.logger.debug("created le BroadcastManager thing");
   }

   /**
    * gets the broadcast, create one if it doesnt exist
    * @returns the broadcast, already playing random songs from the queue
    */
   public getbroadcast(): VoiceBroadcast {
      if (!this.broadcast) {
         this.broadcast = this.autumnblaze.bot.voice?.createBroadcast();
         if (!this.broadcast) throw new Error("there doesn't seem to be a voice manager available");
         this.logger.debug("created a new voice broadcast!");

         const timeoutnext = (): void => {
            void this.playnextsong().then(time => {
               this.timeout = setTimeout(timeoutnext, time);
            });
         };

         timeoutnext();
      }
      return this.broadcast;
   }

   /**
    * plays the next song from a queue to the broadcast
    * @returns length of this song in milliseconds
    */
   private async playnextsong(): Promise<number> {
      this.logger.debug("playing next song!");
      const links: NextSongLink = await getnextsonglink();
      this.nowplayingsonglol = links;
      this.broadcast?.play(links.playable, {
         fec: true,
         bitrate: 128,
         highWaterMark: 20
      });
      if (!this.nowplaying?.details.duration) throw new Error("oiwrneoiwner");
      return converttime(this.nowplaying.details.duration);
   }

   /**
    * call this when someone unsubscribes, will close the broadcast
    * if it is safe, otherwise will keep it alive
    */
   public closebroadcast(): void {
      if (this.broadcast?.subscribers.length !== 0) return;
      this.logger.debug("closed broadcast because (apparently?) noone is listening");
      this.broadcast.end();
      this.nowplayingsonglol = nosong;
      delete this.broadcast;
      if (this.timeout) {
         clearTimeout(this.timeout);
         delete this.timeout;
      }
   }
}
