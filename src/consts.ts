export const devloglevel: "debug" = "debug";
export const prodloglevel: "notice" = "notice";

export const levelshift: number = 9;
export const labelshift: number = 12;

export const maxboopspermessage: number = 3;

export const getplayableurltest: RegExp = /\bhttps:\/\/t4\.bcbits\.com.+?&quot;/;
export const getsongsfromalbumurltest: RegExp = /<script type="application\/ld\+json">[\s\S]+?<\/script>/;
export interface AlbumData {
   url: string;
   numberofsongs: number;
}
export const albums: ReadonlyArray<AlbumData> = [
   { url: "https://astateofsugar.bandcamp.com/album/lollipop", numberofsongs: 21 },
   { url: "https://astateofsugar.bandcamp.com/album/candy", numberofsongs: 36 },
   { url: "https://astateofsugar.bandcamp.com/album/bubblegum", numberofsongs: 47 },
   { url: "https://astateofsugar.bandcamp.com/album/ice-cream", numberofsongs: 48 },
   { url: "https://astateofsugar.bandcamp.com/album/waffle", numberofsongs: 38 },
   { url: "https://astateofsugar.bandcamp.com/album/brownie", numberofsongs: 43 },
   { url: "https://astateofsugar.bandcamp.com/album/chocolate", numberofsongs: 50 },

   { url: "https://poniesatdawn.bandcamp.com/album/hold-your-rainbow", numberofsongs: 15 },
   { url: "https://poniesatdawn.bandcamp.com/album/moonlight-vapours", numberofsongs: 17 },
   { url: "https://poniesatdawn.bandcamp.com/album/crystal-skies", numberofsongs: 26 },
   { url: "https://poniesatdawn.bandcamp.com/album/the-remixes", numberofsongs: 20 },
   { url: "https://poniesatdawn.bandcamp.com/album/celestial-planes", numberofsongs: 42 },
   { url: "https://poniesatdawn.bandcamp.com/album/starlit-flames", numberofsongs: 50 },
   { url: "https://poniesatdawn.bandcamp.com/album/snowfall", numberofsongs: 34 },
   { url: "https://poniesatdawn.bandcamp.com/album/awakening", numberofsongs: 54 },
   { url: "https://poniesatdawn.bandcamp.com/album/voyager", numberofsongs: 58 },
   { url: "https://poniesatdawn.bandcamp.com/album/amity", numberofsongs: 57 },
   { url: "https://poniesatdawn.bandcamp.com/album/guardians", numberofsongs: 65 },
   { url: "https://poniesatdawn.bandcamp.com/album/anthology", numberofsongs: 71 },
   { url: "https://poniesatdawn.bandcamp.com/album/memories", numberofsongs: 60 },
   { url: "https://poniesatdawn.bandcamp.com/album/rebirth", numberofsongs: 68 },
   { url: "https://poniesatdawn.bandcamp.com/album/enigma", numberofsongs: 72 },
   { url: "https://poniesatdawn.bandcamp.com/album/recollections", numberofsongs: 72 },
   { url: "https://poniesatdawn.bandcamp.com/album/skyward", numberofsongs: 70 },
   { url: "https://poniesatdawn.bandcamp.com/album/eternal", numberofsongs: 72 },
   { url: "https://poniesatdawn.bandcamp.com/album/echoes", numberofsongs: 70 },
   { url: "https://poniesatdawn.bandcamp.com/album/ignite", numberofsongs: 74 },
   { url: "https://poniesatdawn.bandcamp.com/album/eclipse", numberofsongs: 72 },

   { url: "https://equinity.bandcamp.com/album/equinity-01-stellar", numberofsongs: 23 },
   { url: "https://equinity.bandcamp.com/album/equinity-02-catalyst", numberofsongs: 40 },
   { url: "https://equinity.bandcamp.com/album/equinity-03-breach", numberofsongs: 39 }
];

export const albumtest: RegExp = /^https:\/\/[a-z]+\.bandcamp\.com\/album\/[a-z\-0-9]+$/;
// i wish this could be compile time
// there is likely a way but i just dont know it
for (const album of albums) if (!albumtest.test(album.url)) throw new Error(`"${album.url}" doesn't appear to be a valid bandcamp album url`);
