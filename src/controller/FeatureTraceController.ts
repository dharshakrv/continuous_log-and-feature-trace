import { Request, Response, Router } from "express";
import { DI } from "../di/DIContainer";
import { Logger } from "../logger/Logger";
import { FeatureTraceService } from "../service/FeatureTraceService";
import { Controller } from "./Controller";

export class FeatureTraceController implements Controller {
    private featureTraceService: FeatureTraceService

    constructor() {
        this.featureTraceService = DI.get(FeatureTraceService)
    }

    getRouter(): Router {
        const router = Router()
        router.post('/insertNewTrace', async (req: Request, res: Response) => {
            await this.featureTraceService.processTracedata(req.body)
            .then((resp: any) => {
                res.json({ status: "success", response: resp })
            })
            .catch((e: any) => {
                res.json(e)
            })
        })

        router.post('/getAllTraces', async (req: Request, res: Response) => {
            let searchType = req.body.search_type
            let requestBody = req.body.payload
            if (searchType == 'criteria') {
                await this.featureTraceService.featureSearch(requestBody)
                .then((resp: any) => {
                    res.json({ status: "success", response: resp.result, totalRecords: resp.totalRecords }) 
                })
                .catch((err: any) => { 
                    res.json({ status: "failed", response: err.result, totalRecords: err.totalRecords }) 
                })
            }
            else if (searchType == 'feature') {
                let requestData: any = req.body.payload
                await this.featureTraceService.getAllTraces(requestData)
                .then((resp: any) => {
                    res.json({ status: "success", response: resp.result, totalRecords: resp.totalRecords })
                })
                .catch((e: any) => {
                    res.json({ status: "failed", response: e.result, totalRecords: e.totalRecords })
                })
            }
        })

        router.post('/getTraces',async (req: Request, res: Response) => {
            let trace_data_obj: any = req.body.parent_trace_id
            await this.featureTraceService.getTraceDetaildById(trace_data_obj)
            .then((resp: any) => {
                res.json({ status: "success", response: resp })
            })
            .catch((e: any) => {
                res.json({ status: "failed", e })
            })
        })

        router.post('/getFeatureLogs', async (req: Request, res: Response) => {
            let spanTraceId: any = req.body.span_trace_id
            let parentTraceId: any = req.body.parent_trace_id
            await this.featureTraceService.getFeatureLogs(spanTraceId)
            .then((resp: any) => { res.json({ status: "success", response: resp }) })
            .catch((e: any) => { res.json({ status: "failed", e }) })
        })

        return router
    }
}


