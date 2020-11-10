import { Collection } from "discord.js";
import { JsonConvert } from "json2typescript";
import { MongoClient, MongoClientOptions } from "mongodb";
import { Logger } from "winston";
import { getlogger } from "../rando";
import { SmolPone } from "../text/commands/pony/pony";
import { GuildConfig, GuildLike } from "./struct";

/** options for creating a new Mango instance */
export interface MangoOpts {
   /** link to the main database server */
   mainlink: string;
   /** link to a secondary database server used to put pony picture data in */
   ponylink?: string;
   /** name of the database to store stuff in the main database server */
   maindbname: string;
   /** name of the database to store pony images in */
   ponydbname?: string;

   /** whether or not to use caching instead of querying the database everytime */
   usecache?: boolean;
}

/**
 * an even higher level api wrapper (named Mango because idk), this provides methods for operations used within
 * {@link AutumnBlaze}, so that I don't duplicate things everywhere.
 */
export class Mango {
   /** {@link MangoOpts} to use */
   private readonly opts: MangoOpts;
   /** JsonConverter to use (no need to create a new instance thats instantly discarded afterwards) */
   public readonly jsonconverter: JsonConvert;
   /** whether or not this instance has started yet, don't start twice */
   private started: boolean = false;
   /** whether or not this instance has stopped (after starting it). After it has stopped, it cannot be restarted */
   private stopped: boolean = false;
   /**
    * connection used for main database server
    *
    * See [MongoClient](https://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html)
    */
   private mongoclient: MongoClient | undefined;
   /**
    * connection used for pony database server, if link is provided
    *
    * See [MongoClient](https://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html)
    */
   private ponyclient: MongoClient | undefined;
   /** [winston](https://www.npmjs.com/package/winston) logger to use */
   private readonly logger: Logger;
   /** cache for items gotten from the database */
   private readonly cache?: Collection<string, GuildConfig>;
   /** options to pass to the [MongoClient](https://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html)
    *
    * See [MongoClient](https://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html)
    */
   // eslint-disable-next-line @typescript-eslint/naming-convention
   private static readonly mongoopts: MongoClientOptions = { ignoreUndefined: true, useUnifiedTopology: true };

   /**
    * maketh Zee with MangoOpts
    * @param opts MangoOpts to use in this
    */
   public constructor(opts: MangoOpts) {
      this.opts = opts;
      this.jsonconverter = new JsonConvert();
      this.logger = getlogger("_mango");
      if (opts.usecache) this.cache = new Collection<string, GuildConfig>();
   }

   /**
    * connects to the database server(s) and gets ready for actual use
    * @returns promise because async lol
    */
   public async start(): Promise<void> {
      if (this.started) return;
      const connectp1: Promise<MongoClient> = MongoClient.connect(this.opts.mainlink, Mango.mongoopts);
      if (!this.opts.ponylink) {
         this.mongoclient = await connectp1;
         this.logger.info("connected to the db!!");
      } else {
         [this.mongoclient, this.ponyclient] = await Promise.all([connectp1, MongoClient.connect(this.opts.ponylink, Mango.mongoopts)]);
         this.logger.info("connected to main db and pony db!!");
      }
      this.started = true;
   }

   /** disconnect from the database servers and performs other necessary cleanup */
   public stop(): void {
      if (this.stopped) return;
      void this.mongoclient?.close().then(() => this.logger.info("disconnected main db"));
      void this.ponyclient?.close().then(() => this.logger.info("disconnected pony db"));
      this.stopped = false;
   }

   /**
    * creates a server (guild) config
    *
    * @param guild a guildlike object to use to get the config, can just be msg.guild for example
    * @returns the guild config object
    */
   public async createservconfig(guild: GuildLike): Promise<GuildConfig> {
      return new Promise((resolve, reject) => {
         if (!this.mongoclient) return reject("connect first!");

         this.logger.debug("about to add a new config! createservconfig()");
         this.mongoclient.db(this.opts.maindbname).collection(guild.id).insertOne({ name: "guildsettings" }, (err, res) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (err) return reject(err);
            if (res.result.ok !== 1) return reject(new Error("no error but res.result.ok isnt 1 which means something went wrong, somehow"));
            const createdconfig: GuildConfig = this.jsonconverter.deserializeObject({ name: "guildsettings" }, GuildConfig);
            if (this.cache) this.cache.set(guild.id, createdconfig);
            resolve(createdconfig);
         });
      });
   }

   /**
    * gets a guild config object from the database if it exists, or creates a
    * new one and gets it
    *
    * @param guild a guildlike object to use to get the config, can just be msg.guild for example
    * @returns the guild config object
    */
   public async getservconfig(guild: GuildLike): Promise<GuildConfig> {
      return new Promise((resolve, reject) => {
         if (!this.mongoclient) return reject("Connect first!");

         const config: GuildConfig | undefined = this.cache?.get(guild.id);
         if (config) return resolve(config);

         this.logger.debug("about to query main db in getservconfig()");
         this.mongoclient.db(this.opts.maindbname).collection(guild.id).findOne({ name: "guildsettings" }, (err, res) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (err) return reject(err);
            if (res) {
               const gottenconfig: GuildConfig = this.jsonconverter.deserializeObject(res, GuildConfig);
               if (this.cache) this.cache.set(guild.id, gottenconfig);
               return resolve(gottenconfig);
            }
            this.logger.debug("create new configg!");
            this.createservconfig(guild).then(resolve).catch(reject);
         });
      });
   }

   public async putpony(pony: SmolPone): Promise<void> {
      return new Promise((resolve, reject) => {
         this.ponyclient?.db(this.opts.ponydbname ?? "pones").collection(pony.id.toString().substring(0, 1)).insertOne(this.jsonconverter.serializeObject(pony), (err, res) => {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
            if (err) reject(err);
            if (res.result.ok !== 1) return reject(new Error("no error but res.result.ok isnt 1 which means something went wrong, somehow"));
            resolve();
         });
      });
   }
}
