import { MongoConnection } from "../config/MongoConnection";
import { DI } from "../di/DIContainer";
import { Logger } from "../logger/Logger";

export class DBService {
    private logger: Logger

    constructor() {
        this.logger = DI.get(Logger)
    }

    insertNew(collectionName: any, documentObject: any) {
        return new Promise((resolve, reject) => {
            if (process.env.LOG_LEVEL === 'DEBUG') {
            this.logger.log(`collectionName, ${collectionName}`)
            this.logger.log(`whereObject, ${documentObject}`)
            }
            MongoConnection.state().getDb().then(async db => {
                const collection = db.collection(collectionName)
                await collection.insertOne(documentObject)
                .then((resp: any) => { 
                    resolve({ status: resp, message: 'criteria object inserted' })
                })
                .catch((e: any) => {
                    reject(e) 
                })
            })
        });
    }

    getByQuery(collectionName: any, whereObject: any) {
        return new Promise((resolve, reject) => {
            if (process.env.LOG_LEVEL === 'DEBUG') {
            this.logger.log(`collectionName, ${collectionName}`)
            this.logger.log(`whereObject, ${whereObject}`)
            }
            MongoConnection.state().getDb().then(async db => {
                const collection = db.collection(collectionName);
                let queryCursor = collection.find<any>(whereObject, {});
                queryCursor.toArray().then((v: any) => {
                    return resolve(v);
                }, (error: any) => {
                    this.logger.error(`Read Error Inner Retrieving, ${error}`);
                    return reject(error);
                }).catch((error: any) => {
                    this.logger.error(`Read Error Outer Retrieving, ${error}`);
                    return reject(error);
                });
            }).catch((error: any) => {
                this.logger.error(`Read Error Outer Retrieving, ${error}`);
                return reject(error);
            });;
        });

    }

    getByQueryProjecttion(collectionName: any, whereObject: any, projection: any) {
        return new Promise((resolve, reject) => {
            if (process.env.LOG_LEVEL === 'DEBUG') {
            this.logger.log(`collectionName, ${collectionName}`)
            this.logger.log(`whereObject, ${whereObject}`)
            }
            MongoConnection.state().getDb().then(async db => {
                const collection = db.collection(collectionName);
                let queryCursor = collection.find<any>(whereObject, {});
                queryCursor.toArray().then((v: any) => {
                    return resolve(v);
                }, (error: any) => {
                    this.logger.error(`Read Error Inner Retrieving, ${error}`);
                    return reject(error);
                }).catch((error: any) => {
                    this.logger.error(`Read Error Outer Retrieving, ${error}`);
                    return reject(error);
                });
            }).catch((error: any) => {
                this.logger.error(`Read Error Outer Retrieving, ${error}`);
                return reject(error);
            });;
        });

    }

    getByArrayArgToNestedArrayQuery(collectionName: any, query: any) {
        return new Promise((resolve, reject) => {
            if (process.env.LOG_LEVEL === 'DEBUG') {
            this.logger.log(`collectionName:, ${collectionName}`)
            this.logger.info(`whereObject:, ${query}`);
            }
            MongoConnection.state().getDb().then(async db => {
                const collection = db.collection(collectionName);
                let queryCursor = collection.aggregate<any>(query);
                queryCursor.toArray().then((v: any) => {
                    return resolve(v);
                }, (error: any) => {
                    this.logger.error(`Read Error Inner Retrieving, ${error}`);
                    return reject(error);
                }).catch((error: any) => {
                    this.logger.error(`Read Error Outer Retrieving, ${error}`);
                    return reject(error);
                });
            }).catch((error: any) => {
                this.logger.error(`Read Error Outer Retrieving, ${error}`);
                return reject(error);
            });;
        });

    }

    getByQueryAndSortAlphaNumeric(collectionName: any, whereObject: any, sortCondition: any) {
        return new Promise((resolve, reject) => {
            // // Added Log Level based on ENV variable by Akhil on 16-08-2021
            // if (process.env.LOG_LEVEL === 'DEBUG') {
            //     this.logger.log("collectionName", collectionName)
            //     this.logger.log("whereObject", whereObject)
            // }
            this.logger.log(`collectionName: , ${collectionName}`);
            this.logger.log(`whereObject: , ${JSON.stringify(whereObject)}`);
            this.logger.log(`sortCondition: , ${JSON.stringify(sortCondition)}`);
            MongoConnection.state().getDb().then(async db => {
                const collection = db.collection(collectionName);
                let queryCursor = collection.find<any>(whereObject, {}).sort(sortCondition).collation({ locale: "en_US", numericOrdering: true }).limit(1);
                queryCursor.toArray().then((v: any) => {
                    // this.logger.log("VisitByv", v)
                    return resolve(v);
                }, (error: any) => {
                    this.logger.error(`Read Error Inner Retrieving , ${error}`);
                    return reject(error);
                }).catch((error: any) => {
                    this.logger.error(`Read Error Outer Retrieving , ${error}`);
                    return reject(error);
                });
            }).catch((error: any) => {
                this.logger.error(`Read Error Outer Retrieving , ${error}`);
                return reject(error);
            });
        });

    }
}
