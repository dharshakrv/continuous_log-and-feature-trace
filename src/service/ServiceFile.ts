import { DI } from "../di/DIContainer";
import TraceObjModel from "../models/feature_trace";

export class Service {

    constructor() {}

    async flattenJson(data: any) {
        const arr: any = [];
        function iterate(obj: any) {
            if (obj.children.length === 0 || obj.children == undefined) {
                return
            } else {
                obj.children.forEach((child: any) => {
                    arr.push(child.root)
                    iterate(child);
                });
            }
        }
        arr.push(data.root)
        iterate(data);
        return arr;
    }

    async consumeAndInsertData(data: any): Promise<any> {
        new Promise(async (resolve, reject) => {
            console.log('consumed Data => ',data)
            let destructuredData: any = await this.flattenJson(JSON.parse(data))
            const parent_traceId: string = destructuredData[0].trace_id
            const feature_traceName: string = destructuredData[0].service_name
            const trace_createdAt: Date = destructuredData[0].startTime
            const trace_obj: Object = destructuredData
            const trace = new TraceObjModel({
                parent_trace_id: parent_traceId,
                feature_trace_name: feature_traceName,
                feature_createdAt: trace_createdAt,
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
