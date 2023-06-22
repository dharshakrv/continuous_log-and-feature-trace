import { DI } from "../di/DIContainer"
import { MongoConnection } from "../config/MongoConnection";
import { Service } from "./ServiceFile"
import { DBService } from "./DBService";
import { Logger } from "../logger/Logger";
import { FeatureRepository } from "../data/repository/FeatureRepository";
import { DataObjectKeyRepository } from "../data/repository/DataObjectKeyRepository";

export class FeatureTraceService {

    private serviceFile: Service
    private logger: Logger
    private dbService: DBService
    private featureRepository: FeatureRepository;
    private dataObjectKeyRepository: DataObjectKeyRepository;

    constructor() {
        this.serviceFile = DI.get(Service)
        this.logger = DI.get(Logger)
        this.dbService = DI.get(DBService)
        this.featureRepository = DI.get(FeatureRepository);
        this.dataObjectKeyRepository = DI.get(DataObjectKeyRepository);
    }

    async featureSearch(requestData: any) {
        return new Promise(async(resolve, reject) => {
            let dataObjField = requestData.dataField
            let dataObjValue = requestData.dataValue
            if (dataObjField == '' || dataObjValue == '') {
                reject("dataField or dataValue not to be empty")
            }
            let logWhereObj: any = {
                "request_body": { $ne: null }
            }
            let fetchedLogsByTrace: any = await this.dbService.getByQuery('log_objects', logWhereObj )
            let parent_traces = []
            for (let reqObjlogs of fetchedLogsByTrace) {
                let reqObj = JSON.parse(JSON.stringify(reqObjlogs.request_body))
                let objKeys = Object.keys(reqObj)
                if (objKeys.length == 0) continue
                if (objKeys.includes(dataObjField) && reqObj[dataObjField] == dataObjValue) {
                    parent_traces.push(reqObjlogs.span_trace_id)
                }
            }

            let featureWhereObj = [
                {
                    $facet: {
                        "result": [
                            { $match: { "parent_trace_id": { $in: parent_traces } } }
                        ],
                        "totalDocuments": [
                            { $match: { "parent_trace_id": { $in: parent_traces } } },
                            { $count: "count" }
                        ]
                    }
                }
            ]

            // let featureWhereObj = {
            //     "parent_trace_id": { $in: parent_traces }
            // }

            // let featureWhereObj = [
            //     { $match: { "parent_trace_id": { $in: parent_traces } } },
            //     { $project: { "feature_trace": 0 } },
            //     { $count: "count" }
            // ]
            // let fetchedTraceRecords: any = await this.dbService.getByQuery('trace_obj', featureWhereObj)
            let fetchedTraceRecords: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', featureWhereObj)
            let response: any = {
                result: fetchedTraceRecords[0].result,
                totalRecords: fetchedTraceRecords[0].totalDocuments[0].count
            }
            resolve(response)
        })
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
                
                let featureWhereObj = [ { 
                    $facet: {
                        "result": [
                            { $match: { "createdAt": { $gte: startDate, $lte: endDate } } },
                            {  $sort: { _id: -1 } },
                            { $match: { 
                                "app_code": requestData.app_code, 
                                "parent_trace_id": traceId, 
                                "feature_trace_name": featureTraceName, 
                                "request_ip": requestIP 
                            } },
                            { $project: { "feature_trace": 0 } },
                            { $skip: noOfrecords * (pageNo - 1) },
                            { $limit: noOfrecords }
                        ],
                        "totalDocuments": [
                            { $match: { "createdAt": { $gte: startDate, $lte: endDate } } },
                            {  $sort: { _id: -1 } },
                            { $match: { 
                                "app_code": requestData.app_code,
                                "parent_trace_id": traceId, 
                                "feature_trace_name": featureTraceName
                            } },
                            { $project: { "feature_trace": 0 } },
                            { $count: "count" }
                        ],
                    }
                } ]


                // let query = [
                //     { 
                //         $match: { 
                //             "createdAt": { 
                //                 $gte: startDate, 
                //                 $lte: endDate
                //             }
                //         }
                //     },
                //     {  $sort: { _id: -1 } },
                //     { $match: { 
                //         "app_code": requestData.app_code, 
                //         "parent_trace_id": traceId, 
                //         "feature_trace_name": featureTraceName, 
                //         "request_ip": requestIP 
                //     } },
                //     { $project: { "feature_trace": 0 } },
                //     { $skip: noOfrecords * (pageNo - 1) },
                //     { $limit: noOfrecords },
                // ]

                // this.logger.log(`query: , ${JSON.stringify(query)}`)
                // let resultData: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', query)
                // let totalDocuments: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', [
                //     { $match: { "createdAt": { 
                //         $gte: startDate, 
                //         $lte: endDate
                //     }}},
                //     {  $sort: { _id: -1 } },
                //     { $match: { 
                //         "app_code": requestData.app_code,
                //         "parent_trace_id": traceId, 
                //         "feature_trace_name": featureTraceName
                //     } },
                //     { $project: { "feature_trace": 0 } },
                //     { $count: "count" }
                // ])
                let fetchedTraceRecords: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', featureWhereObj)
                let response: any = {
                    result: fetchedTraceRecords[0].result,
                    totalRecords: fetchedTraceRecords[0].totalDocuments[0].count
                }
                resolve(response)
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

    async searchFeatureByKeys(featureName: string, featureTraceId: any, dataObjField: any, dataObjValue: any) {
        return new Promise(async(resolve, reject) => {
            let traceId = featureTraceId ? featureTraceId : { $ne:null }
            let featureTraceName = featureName ? featureName : { $ne:null }
            // let traceWhereObj: any = {
            //     "parent_trace_id": traceId,
            //     "feature_trace_name": featureTraceName
            // }
            let logWhereObj: any = {
                // "span_trace_id": traceId,
                "request_body": { $ne: null }
            }
            // let fetchedTraceRecords: any = await this.dbService.getByQuery('trace_obj', traceWhereObj)
            let fetchedLogsByTrace: any = await this.dbService.getByQuery('log_objects', logWhereObj )
            // let FEATURE_NAME: string = fetchedTraceRecords[0].feature_trace_name
            // let APP_CODE: string = fetchedTraceRecords[0].app_code
            // let dataKeys: any = []
            // await this.featureRepository.findByCode(FEATURE_NAME, 'REAL_RECO')
            // .then(async(featureRecord: any) => {
            //     let dataObjectId = featureRecord.data_object_id
            //     await this.dataObjectKeyRepository.getByDataObject(dataObjectId)
            //     .then((dataObjectKeys: any) => { 
            //         let dataKeys = dataObjectKeys.map((dk: any) => dk.code)
            //         if (!dataKeys.includes(dataObjField)) reject(`${dataObjField}, data Field not exists`)
            //     })
            //     .catch((err: any) => { 
            //         console.log('err2: ', err) 
            //     })
            // })
            // .catch((err: any) => { 
            //     console.log('err1: ', err) 
            // })
            let parent_traces = []
            for (let reqObjlogs of fetchedLogsByTrace) {
                let reqObj = JSON.parse(JSON.stringify(reqObjlogs.request_body))
                if (Object.keys(reqObj).length == 0) continue
                let objKeys = Object.keys(reqObj)
                if (objKeys.includes(dataObjField) && reqObj[dataObjField] == dataObjValue) {
                    parent_traces.push(reqObjlogs.span_trace_id)
                }
            }
            let featureWhereObj = {
                "parent_trace_id": { $in: parent_traces }
            }
            let fetchedTraceRecords = this.dbService.getByQuery('trace_obj', featureWhereObj)
            resolve(fetchedTraceRecords)
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
        })
    }
}
