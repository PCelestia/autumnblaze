import { Collection } from "discord.js";
import { JsonConvert } from "json2typescript";
import { MongoClient, MongoClientOptions } from "mongodb";
import { Logger } from "winston";
import { getlogger } from "../rando";
import { GuildConfig, GuildLike } from "./struct";

export interface MangoOpts {
   mainlink: string;
   ponylink?: string;
   maindbname: string;

   usecache?: boolean;
}
export class Mango {
   private readonly opts: MangoOpts;
   public readonly jsonconverter: JsonConvert;
   private started: boolean = false;
   private stopped: boolean = false;
   private mongoclient: MongoClient | undefined;
   private ponyclient: MongoClient | undefined;
   private readonly logger: Logger;
   private readonly cache?: Collection<string, GuildConfig>;
   // eslint-disable-next-line @typescript-eslint/naming-convention
   private static readonly mongoopts: MongoClientOptions = { ignoreUndefined: true, useUnifiedTopology: true };

   public constructor(opts: MangoOpts) {
      this.opts = opts;
      this.jsonconverter = new JsonConvert();
      this.logger = getlogger("_mango");
      if (opts.usecache) this.cache = new Collection<string, GuildConfig>();
   }

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

   public stop(): void {
      if (this.stopped) return;
      void this.mongoclient?.close().then(() => this.logger.info("disconnected main db"));
      void this.ponyclient?.close().then(() => this.logger.info("disconnected pony db"));
      this.stopped = false;
   }

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
}
