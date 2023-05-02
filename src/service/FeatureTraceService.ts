import { DI } from "../di/DIContainer"
import { MongoConnection } from "../config/MongoConnection";
import { Service } from "./ServiceFile"
import { DBService } from "./DBService";
import { Logger } from "../logger/Logger";

export class FeatureTraceService {

    private serviceFile: Service
    private logger: Logger
    private dbService: DBService

    constructor() {
        this.serviceFile = DI.get(Service)
        this.logger = DI.get(Logger)
        this.dbService = DI.get(DBService)
    }

    async getAllTraces(pageNum: any, pageSize: any) {
        return new Promise(async(resolve, reject) => {
            try {
                if (pageNum == undefined || pageNum == null) {
                    reject('Invalid parameters for pageNum')
                }
                if (pageSize == undefined || pageSize == null) {
                    reject('Invalid parameters for page Size')
                }
                let query = [
                    {
                        $sort: { _id: -1 }
                    },
                    {
                        $project: {
                            _id: 0, parent_trace_id: 1, request_ip: 1, feature_trace_name: 1, feature_createdAt: 1
                        }
                    },
                    {
                        $skip: pageSize * (pageNum - 1)
                    },
                    {
                        $limit: pageSize
                    }
                ]
                
                this.logger.log(`query: , ${JSON.stringify(query)}`)
                let resultData: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', query)
                resolve(resultData)
            }
            catch(error) {
                reject(error)
            }
        })
    }

    async getTraceDetaildById(traceId: any) {
        return new Promise((resolve, reject) => {
            try {
                if (traceId === null || traceId === undefined) {
                    reject(`traceId can't be Null/Undefined ${traceId}`)
                }
                let whereObject = { parent_trace_id: traceId }
                let traceDetails: any = this.dbService.getByQuery('trace_obj', whereObject)
                resolve(traceDetails)
            }
            catch(error) {
                reject(error)
            }
        })
    }

    async getFeatureLogs(spanTraceId: any, parentTraceId: any) {
        return new Promise((resolve, reject) => {
            try {
                if (spanTraceId === null || spanTraceId === undefined) {
                    reject(`spanTraceId can't be Null/Undefined ${spanTraceId}`)
                }
                if (parentTraceId === null || parentTraceId === undefined) {
                    reject(`parentTraceId can't be Null/Undefined ${parentTraceId}`)
                }
                let whereObject = {  span_trace_id: spanTraceId, parent_trace_id: parentTraceId }
                let projection = { projection: { _id: 0, log_data: 1 }}
                let logsByTraceid: any = this.dbService.getByQueryProjecttion('log_objects', whereObject, projection)
                resolve(logsByTraceid)
            }
            catch(error) {
                reject(error)
            }
        })
    }

    async processTracedata(trace_data_obj: any): Promise<any> {
        new Promise(async (resolve, reject) => {
            let destructuredData: any = [];
            function iterate(obj: any) {
                if (obj == null || obj == undefined) return
                if (obj.children.length === 0 || obj.children == undefined) {
                    return
                } else {
                    for (let ob of obj.children) {
                        if (ob == null || ob == undefined) continue
                        destructuredData.push(ob.root)
                        iterate(ob);
                    }
                }
            }
            destructuredData.push(trace_data_obj.root)
            iterate(trace_data_obj);

            let requestIP = destructuredData[0].requestIP
            const parent_traceId: string = destructuredData[0].trace_id
            const feature_traceName: string = destructuredData[0].service_name
            const trace_createdAt: Date = destructuredData[0].startTime
            const app_code: string = destructuredData[0].http_path.split("/")[0]
            const trace_obj: Object = destructuredData

            const trace_data: any = {
                parent_trace_id: parent_traceId,
                feature_trace_name: feature_traceName,
                app_code: app_code,
                feature_createdAt: trace_createdAt,
                feature_trace: trace_obj,
                request_ip: requestIP,
                createdAt: new Date(),
                updatedAt: new Date()
            }

            MongoConnection.state().getDb().then(async db => {
                const collectionName = db.collection('trace_obj')
                await collectionName.insertOne(trace_data)
                .then((resp: any) => { 
                    this.logger.log('trace_obj inserted')
                    resolve('trace obj inserted')
                })
                .catch((e: any) => {
                    this.logger.log(e) 
                    reject(e)
                })
            })
        })
    }
}
