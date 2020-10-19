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

@JsonObject("BandcampTrackDetails") export class TrackDetails {
   @JsonProperty("duration", String) public duration: string = "";
   @JsonProperty("name", String) public name: string = "";
   @JsonProperty("@id", String) public link: string = "";
}

@JsonObject("BandcampTrack") export class Track {
   @JsonProperty("position", Number) public position: number = 0;
   @JsonProperty("item", TrackDetails) public details: TrackDetails = new TrackDetails();
}

@JsonObject("BandcampTrackList") export class Tracklist {
   @JsonProperty("numberOfItems", Number) public numberoftracks: number = 0;
   @JsonProperty("itemListElement", [Track]) public tracks: Array<Track> = [];
}

@JsonObject("BandcampAlbumArtist") export class AlbumArtist {
   @JsonProperty("name", String) public name: string = "";
   @JsonProperty("@id", String) public link: string = "";
}

@JsonObject("BandcampAlbum") export class Album {
   @JsonProperty("keywords", [String]) public keywords: Array<string> = [];
   @JsonProperty("datePublished", String) public datepublished: Array<string> = [];
   @JsonProperty("albumProductionType", String) public albumproductiontype: string = "";
   @JsonProperty("name", String) public name: string = "";
   @JsonProperty("track", Tracklist) public tracklist: Tracklist = new Tracklist();
   @JsonProperty("@id", String) public link: string = "";
   @JsonProperty("numTracks", Number) public numberoftracks: number = 0;
   @JsonProperty("image", String) public imagelink: string = "";
   @JsonProperty("byArtist", AlbumArtist) public albumartist: AlbumArtist = new AlbumArtist();
}

export async function getplayableurl(url: string): Promise<string | false> {
   const matches: RegExpMatchArray | null = getplayableurltest.exec((await superagent.get(url)).text);
   if (!matches || matches.length !== 1) return false;
   const escaped: string = unescape(matches[0]);
   return escaped.substring(0, escaped.length - 1);
}

export async function getsongsfromalbumurl(url: string): Promise<string | false> {
   const matches: RegExpMatchArray | null = getsongsfromalbumurltest.exec((await superagent.get(url)).text);
   if (!matches || matches.length !== 1) return false;
   return unescape(matches[0].substring("<script type=\"application/ld+json\">".length, matches[0].length - "</script>".length).trim());
}

export function parsealbumjson(json: string): Album | Array<Album> {
   return new JsonConvert().deserialize(JSON.parse(json), Album);
}

export async function getplayableurlsfromalbum(url: string): Promise<Array<string> | false> {
   const json: string | false = await getsongsfromalbumurl(url);
   if (!json) return false;
   let albums: Album | Array<Album> = parsealbumjson(json);
   if (!(albums instanceof Array)) albums = [albums];

   const res: Array<string> = [];
   for (const album of albums) for (const track of album.tracklist.tracks) {
      const playable: string | false = await getplayableurl(track.details.link);
      if (playable) res.push(playable);
   }
   return res;
}

export async function getshuffledlinksfromalbum(urls: ReadonlyArray<string>): Promise<Array<string> | false> {
   const res: Array<string> = [];
   for (const url of urls) {
      const playableurls: Array<string> | false = await getplayableurlsfromalbum(url);
      if (playableurls && playableurls.length > 0) res.push(...playableurls);
   }
   if (res.length === 0) return false;
   else return res;
}


// already shuffled
let queue: Array<string> | undefined = undefined;
// maps album number, to an object with string keys (for example "5"), and each key has its corresponding track
// albums and keys generated whole album at a time
const songurls: Collection<string, { [key: string]: string }> = new Collection<string, { [key: string]: string }>();
// cache of playable urls (links to the actual audio stream)
// idk how i want to do the url invalidatin or whatever lol
// maps
// const playableurlcache: Collection<string, string> = new Collection<string, string>();

export function getnewqueue(): Array<string> {
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

/**
 * @returns 0 is the bandcamp link, 1 is the playable stream url
 */
export async function getnextsonglink(): Promise<[string, string]> {
   // gotta satisfy typescript ultra strict typing yk?

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
      if (!albumurl) return await getnextsonglink();
      let album: Album | Array<Album> = parsealbumjson(albumurl);
      if (!(album instanceof Array)) album = [album];
      let h: number = 0;
      for (const track of album[0].tracklist.tracks) albumsongurls[`${h++}`] = track.details.link;
      if (!albumsongurls[songnum]) throw new Error("lskdjlkjdlkjfsldkjfslkdjlsdkjf something went wrong hhhhhhhhhhhhhhhhhhh");
   }

   const playableurl: string | false = await getplayableurl(albumsongurls[songnum]);
   if (playableurl) return [albumsongurls[songnum], playableurl];
   throw new Error(`wtf hhhh theres no playable url for ${albumsongurls[songnum]}`);
}

export class BroadcastManager {
   private broadcast?: VoiceBroadcast;
   private readonly autumnblaze: AutumnBlaze;
   private readonly logger: Logger;

   public constructor(autumnblaze: AutumnBlaze) {
      this.autumnblaze = autumnblaze;
      this.logger = getlogger("_voice");
      this.logger.debug("created le BroadcastManager thing");
   }

   public getbroadcast(): VoiceBroadcast {
      if (!this.broadcast) {
         this.broadcast = this.autumnblaze.bot.voice?.createBroadcast();
         if (!this.broadcast) throw new Error("there doesn't seem to be a voice manager available");
         this.logger.debug("created a new voice broadcast!");
         void getnextsonglink().then(links => {
            this.broadcast?.play(links[1]).on("finish", () => {
               void getnextsonglink().then(newlinks => this.broadcast?.play(newlinks[1]));
            });
         });
      }
      return this.broadcast;
   }

   public closebroadcast(): void {
      if (this.broadcast?.subscribers.length !== 0) return;
      this.logger.debug("closed broadcast because (apparently?) noone is listening");
      this.broadcast.end();
      delete this.broadcast;
   }
}
