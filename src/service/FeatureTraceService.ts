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

    async getAllTraces(requestData: any) {
        return new Promise(async(resolve, reject) => {
            let startDate = requestData.start_date ? new Date(requestData.start_date): new Date("2023-01-01 00:00:00")
            let endDate = requestData.end_date ? new Date(requestData.end_date) : new Date()
            let pageNo = requestData.pageNo ? parseInt(requestData.pageNo) : 1
            let noOfrecords = requestData.size ? parseInt(requestData.size) : 10
            let traceId = requestData.traceId ? requestData.traceId : { $ne:null }
            let featureTraceName = requestData.featureTraceName ? requestData.featureTraceName : { $ne:null }
            let requestIP = requestData.requestIP ? requestData.requestIP : { $ne:null }
            try {
                /**
                 * Aggregation search on column
                 * { $match: { "app_code": { $regex: "", $options: "i" } } }
                 */

                /**
                 * Fecet Query
                 * let facetQuery = [ { 
                        $facet: {
                            "result": [
                                { $match: { "createdAt": {  $gte: startDate, $lte: endDate } } },
                                { $sort: { _id: -1 } },
                                { $match: { 
                                        "app_code": appCode, 
                                        "parent_trace_id": traceId, 
                                        "feature_trace_name": featureTraceName,
                                        "request_ip": requestIP
                                    }
                                },
                                { $project: { "feature_trace": 0 } },
                                { $skip: noOfrecords * (pageNo - 1) },
                                { $limit: noOfrecords },
                            ],
                            "totalDocuments": [
                                { $match: { "createdAt": {  $gte: startDate, $lte: endDate } } },
                                {  $sort: { _id: -1 } },
                                { $match: { 
                                    "app_code": appCode,
                                    "parent_trace_id": traceId, 
                                    "feature_trace_name": featureTraceName
                                    } 
                                },
                                { $project: { "feature_trace": 0 } },
                                { $count: "count" }
                            ],
                        }
                    } ]
                 */
                let query = [
                    { 
                        $match: { 
                            "createdAt": { 
                                $gte: startDate, 
                                $lte: endDate
                            }
                        }
                    },
                    {  $sort: { _id: -1 } },
                    { $match: { 
                        "app_code": requestData.app_code, 
                        "parent_trace_id": traceId, 
                        "feature_trace_name": featureTraceName, 
                        "request_ip": requestIP 
                    } },
                    { $project: { "feature_trace": 0 } },
                    { $skip: noOfrecords * (pageNo - 1) },
                    { $limit: noOfrecords },
                ]
                
                this.logger.log(`query: , ${JSON.stringify(query)}`)
                let resultData: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', query)
                let totalDocuments: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', [
                    { $match: { "createdAt": { 
                        $gte: startDate, 
                        $lte: endDate
                    }}},
                    {  $sort: { _id: -1 } },
                    { $match: { 
                        "app_code": requestData.app_code,
                        "parent_trace_id": traceId, 
                        "feature_trace_name": featureTraceName
                    } },
                    { $project: { "feature_trace": 0 } },
                    { $count: "count" }
                ])
                resolve({ result: resultData, totalRecords: totalDocuments[0].count })
            }
            catch(error) {
                reject({ result: [], totalRecords: 0 })
            }
        })
    }

    async getTraceDetaildById(traceId: any) {
        return new Promise((resolve, reject) => {
            try {
                if (traceId === null || traceId === undefined) {
                    this.logger.log(`traceId can't be Null/Undefined`)
                    reject(`traceId can't be Null/Undefined`)
                }
                let whereObject = { parent_trace_id: traceId }
                this.logger.log(`whereObj query => , ${whereObject}`)
                let traceDetails: any = this.dbService.getByQuery('trace_obj', whereObject)
                resolve(traceDetails)
            }
            catch(error) {
                reject(error)
            }
        })
    }

    async getFeatureLogs(spanTraceId: any) {
        return new Promise((resolve, reject) => {
            try {
                if (spanTraceId === null || spanTraceId === undefined) {
                    this.logger.log(`spanTraceId can't be Null/Undefined`)
                    reject(`spanTraceId can't be Null/Undefined`)
                }
                let whereObject = {  span_trace_id: spanTraceId }
                this.logger.log(`whereObj query => , ${whereObject}`)
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
                        if (!ob.root) {
                            destructuredData.push(ob)
                            return
                        }
                        destructuredData.push(ob.root)
                        iterate(ob);
                    }
                }
            }
            destructuredData.push(trace_data_obj.root)
            iterate(trace_data_obj);
            // resolve(destructuredData)

            this.logger.log(`final data: ,${JSON.stringify(destructuredData)}`)
            // let requestIP = destructuredData[0].requestIP
            // const parent_traceId: string = destructuredData[0].trace_id
            // const feature_traceName: string = destructuredData[0].service_name
            // const trace_createdAt: Date = destructuredData[0].startTime
            // const app_code: string = destructuredData[0].http_path.split("/")[0]
            // const trace_obj: Object = destructuredData

            // const trace_data: any = {
            //     parent_trace_id: parent_traceId,
            //     feature_trace_name: feature_traceName,
            //     app_code: app_code,
            //     feature_createdAt: trace_createdAt,
            //     feature_trace: trace_obj,
            //     request_ip: requestIP,
            //     createdAt: new Date(),
            //     updatedAt: new Date()
            // }

            // MongoConnection.state().getDb().then(async db => {
            //     const collectionName = db.collection('trace_obj')
            //     await collectionName.insertOne(trace_data)
            //     .then((resp: any) => { 
            //         this.logger.log('trace_obj inserted')
            //         resolve('trace obj inserted')
            //     })
            //     .catch((e: any) => {
            //         this.logger.log(e) 
            //         reject(e)
            //     })
            // })
        })
    }
}
