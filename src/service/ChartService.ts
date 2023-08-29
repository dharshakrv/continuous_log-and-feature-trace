import { DI } from "../di/DIContainer";
import { Logger } from "../logger/Logger";
import { DBService } from "./DBService";

export class ChartService {
    private logger: Logger
    private dbService: DBService

    constructor() {
        this.logger = DI.get(Logger)
        this.dbService = DI.get(DBService)
    }

    async featureChartService(requestBody: any) {
        return new Promise(async(resolve, reject) => {
            let featureWhereObj = [ { $facet: {
                "result": [
                    { $match: { 
                        "app_code": requestBody.app_code
                    } },
                    { $project: { 
                    "parent_trace_id": 0, "feature_trace_name": 0, "app_code": 0, 
                    "feature_createdAt": 0, "request_ip": 0 
                }}]
            }}]
            let fetchedTraceRecords: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', featureWhereObj)
            let res: any [] = fetchedTraceRecords[0].result
            let requiredResult: any [] = []
            res.map((obj) => {
                let currObj = {
                    "feature_name": obj.feature_trace[0].service_name,
                    "statusCode": obj.feature_trace[0].http_status_code,
                    "responseTime": obj.feature_trace[0].responseTimestamp
                }
                requiredResult.push(currObj)
            })
            
            // feature response_code counts
            const status200Counts = this.filterByResponseCode(requiredResult, 200).length
            const status400Counts = this.filterByResponseCode(requiredResult, 400).length
            const status500Counts = this.filterByResponseCode(requiredResult, 500).length

            // feature repsonse_time counts
            const lessthan1sec_counts = this.filterByResponseTime(requiredResult, 0, 1000).length
            const morethan1seclessthan5sec_counts = this.filterByResponseTime(requiredResult, 1000, 5000).length
            const morethan5seclessthan10sec_counts = this.filterByResponseTime(requiredResult, 5000, 10000).length
            const morethan10sec_counts = this.filterByResponseTime(requiredResult, 10000, 0).length
            
            let response = [{
                chartType: "response_codes",
                data: [{
                    "status_200": status200Counts,
                    "status_400": status400Counts,
                    "status_500": status500Counts
                }]
            },
            {
                chartType: "responseTime",
                data: [{
                    "<1sec": lessthan1sec_counts,
                    '>1sec<5sec': morethan1seclessthan5sec_counts,
                    ">5sec<10sec": morethan5seclessthan10sec_counts,
                    ">10sec": morethan10sec_counts
                }]
            }]
            
            resolve({ 
                result: requiredResult,
                response: response,
                total: res.length 
            })
        })
    }

    async featureTraceListByStatusCodes(responseCode: any, appCode: any) {
        return new Promise(async(resolve, reject) => {
            // feature whereObject
            let featureWhereObj = [{ $facet: {
                "result": [
                    { $match: { 
                        "app_code": appCode
                    } },
                    { $project: { 
                    "parent_trace_id": 0, "feature_trace_name": 0, "app_code": 0, 
                    "feature_createdAt": 0, "request_ip": 0 
                }}]
            }}]

            let requiredResult = await this.fetchTraceRecords(featureWhereObj)
            // feature response_code counts
            const featureListByResponseCode = this.filterByResponseCode(requiredResult, responseCode)
            resolve([{
                chartType: "response_codes",
                data: [{ "filteredfeatureList": featureListByResponseCode }]
            }])
        })
    }

    async featureTraceListByResponseTime(responseTime1: any, responseTime2: any, appCode: any) {
        return new Promise(async(resolve, reject) => {
            // feature whereObject
            let featureWhereObj = [{ $facet: {
                "result": [
                    { $match: { 
                        "app_code": appCode
                    } },
                    { $project: { 
                    "parent_trace_id": 0, "feature_trace_name": 0, "app_code": 0, 
                    "feature_createdAt": 0, "request_ip": 0 
                }}]
            }}]

            let requiredResult = await this.fetchTraceRecords(featureWhereObj)
            // feature response_code counts
            const featureListByResponseTime = this.filterByResponseTime(requiredResult, responseTime1, responseTime2)
            resolve([{
                chartType: "response_time",
                data: [{ "filteredfeatureList": featureListByResponseTime }]
            }])
        })
    }

    async fetchTraceRecords(featureWhereObj: any) {
        let fetchedTraceRecords: any = await this.dbService.getByArrayArgToNestedArrayQuery('trace_obj', featureWhereObj)
        let res: any [] = fetchedTraceRecords[0].result
        let requiredResult: any [] = []
        res.map((obj) => {
            let currObj = {
                "feature_name": obj.feature_trace[0].service_name,
                "statusCode": obj.feature_trace[0].http_status_code,
                "responseTime": obj.feature_trace[0].responseTimestamp
            }
            requiredResult.push(currObj)
        })
        return requiredResult
    }

    filterByResponseCode(list: any [], responseCode: number) {
        console.log('list filter -> ', list.filter(ob => ob.statusCode === responseCode))
        return list.filter(ob => ob.statusCode === responseCode)
    }

    filterByResponseTime(list: any [], low: number, high: number) {
        if (low === 0) return list.filter(ob => ob.responseTime <= high)
        else if (high === 0) return list.filter(ob => ob.responseTime > low) 
        console.log('list filter -> ',list.filter(ob => ob.responseTime > low && ob.responseTime <= high).length)
        return list.filter(ob => ob.responseTime > low && ob.responseTime <= high)
    }
}
