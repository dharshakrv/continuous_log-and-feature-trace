import { resolve } from "path"
import { DI } from "../di/DIContainer"
import TraceObjModel from "../models/feature_trace"
import { Service } from "./ServiceFile"

export class FeatureTraceService {

    private serviceFile: Service

    constructor() {
        this.serviceFile = DI.get(Service)
    }

    async processTracedata(trace_data_obj: any): Promise<any> {
        new Promise(async (resolve, reject) => {
            const resp: any = await this.serviceFile.flattenJson(trace_data_obj)
            const parent_traceId: string = resp[0].trace_id
            const trace_createdAt: number = resp[0].startTime
            const trace_obj: Object = resp
            const trace = new TraceObjModel({
                parent_trace_id: parent_traceId,
                feature_createdAt: new Date(trace_createdAt),
                feature_trace: trace_obj,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            await trace.save((err: any) => {
                if (!err) resolve('trace object inserted')
                else reject(err)
            })
        })
    }
}
