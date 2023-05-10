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
                res.json({ status: "error", response: e })
            })
        })

        router.post('/getAllTraces', async (req: Request, res: Response) => {
            let requestData: any = req.body
            await this.featureTraceService.getAllTraces(requestData)
            .then((resp: any) => {
                res.json({ status: "success", response: resp })
            })
            .catch((e: any) => {
                res.json({ status: "error", response: e })
            })
        })

        router.post('/getTraces',async (req: Request, res: Response) => {
            let trace_data_obj: any = req.body.parent_trace_id
            await this.featureTraceService.getTraceDetaildById(trace_data_obj)
            .then((resp: any) => {
                res.json({ status: "success", response: resp })
            })
            .catch((e: any) => {
                res.json({ status: "error", response: e })
            })
        })

        router.post('/getFeatureLogs', async (req: Request, res: Response) => {
            let spanTraceId: any = req.body.span_trace_id
            let parentTraceId: any = req.body.parent_trace_id
            await this.featureTraceService.getFeatureLogs(spanTraceId, parentTraceId)
            .then((resp: any) => { res.json({ status: "success", response: resp }) })
            .catch((e: any) => { res.json({ status: "error", response: e }) })
        })

        return router
    }
}


