import { MongoClient, MongoError, Db } from 'mongodb';
import { DI } from '../di/DIContainer';
import { Logger } from '../logger/Logger';

export class MongoConnection {
    
    private static instance: MongoConnection
    private client?: MongoClient = undefined
    private db?: Db = undefined
    private logger: Logger

    constructor() {
        this.logger = DI.get<Logger>(Logger)
    }

    private connect(): Promise<MongoClient> {
        return new Promise<MongoClient>(async(resolve, reject) => {
            MongoClient.connect(`mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`, { auth: { username: process.env.MONGO_USER!, password: process.env.MONGO_PASS! }, maxPoolSize: 10 })
            .then((client: any) => resolve(client))
            .catch((error: any) => reject(error));
        })
    }

    static state(): MongoConnection {
        if (MongoConnection.instance === undefined) {
            MongoConnection.instance = new MongoConnection()
        }
        return MongoConnection.instance
    }

    getClient(): Promise<MongoClient> {
        return new Promise<MongoClient>((resolve, reject) => {
            if (this.client === undefined) {
                this.connect().then(client=> {
                    this.client = client
                    resolve(this.client)
                }).catch(error => {
                    reject(error)
                })
            }
            else {
                resolve(this.client)
            }
        })
    }

    getDb(): Promise<Db> {
        return new Promise<Db>((resolve, reject) => {
            if (this.db === undefined) {
                this.getClient().then(client => {
                    this.db = client.db(process.env.MONGO_DBNAME)
                    resolve(this.db)
                }).catch(error => {
                    reject(error)
                })
            }
            else {
                resolve(this.db)
            }
        })
    }
}
