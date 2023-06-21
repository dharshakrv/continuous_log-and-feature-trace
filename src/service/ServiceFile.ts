import { MongoConnection } from "../config/MongoConnection";
import { DI } from "../di/DIContainer";
import { Logger } from "../logger/Logger";

export class Service {

    private logger: Logger

    constructor() {
        this.logger = DI.get(Logger)
    }

    async flattenJson(data: any) {
        const arr: any = [];
        function iterate(obj: any) {
            if (obj == null || obj == undefined) return
            if (obj.children.length === 0 || obj.children == undefined) {
                return
            } else {
                for (let ob of obj.children) {
                    if (ob == null || ob == undefined) continue
                    if (!ob.root) {
                        arr.push(ob)
                        return
                    }
                    arr.push(ob.root)
                    iterate(ob);
                }
            }
        }
        arr.push(data.root)
        iterate(data);
        return arr;
    }

    async consumeAndInsertTraceData(data: any): Promise<any> {
        new Promise(async (resolve, reject) => {
            this.logger.log(JSON.stringify(data))
            let requestIP = data.requestIP
            let appCode = data.APP_CODE
            let destructuredData: any = await this.flattenJson(data)
            const parent_traceId: string = destructuredData[0].trace_id
            const feature_traceName: string = destructuredData[0].service_name
            const trace_createdAt: Date = destructuredData[0].startTime
            const trace_obj: Object = destructuredData

            const trace_data: any = {
                parent_trace_id: parent_traceId,
                feature_trace_name: feature_traceName,
                app_code: appCode,
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
                })
                .catch((e: any) => {
                    this.logger.log(e) 
                })
            })
        })
    }

    async consumeAndInsertLogData(data: any): Promise<any> {
        new Promise(async (resolve, reject) => {
            let spanTraceId: any
            let parentTraceId: any
            let requestBody: any
            let logData = data[0]
            
            if (logData.log == "REQ_BODY" || "REQ_QUERY") {
                requestBody = logData.requestObj
            }
            if (logData.trace !== undefined || logData.trace !== null) {
                spanTraceId = logData.span_trace
            }
            delete logData.requestObj
            delete logData.span_trace

            let destructuredData: any = {
                span_trace_id: spanTraceId,
                log_data: logData,
                request_body: requestBody
            }
            MongoConnection.state().getDb().then(async db => {
                const collectionName = db.collection('log_objects')
                await collectionName.insertOne(destructuredData)
                .then((resp: any) => { 
                    this.logger.log('log_obj inserted')
                })
                .catch((e: any) => {
                    this.logger.log(e)
                })
            })
        })
    }
}
