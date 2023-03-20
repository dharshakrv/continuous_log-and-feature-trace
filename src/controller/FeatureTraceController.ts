import { Request, Response, Router } from "express";
import { DI } from "../di/DIContainer";
import { Logg } from "../logger/Logg";
import { FeatureTraceService } from "../service/FeatureTraceService";
import { Controller } from "./Controller";

export class TestController implements Controller {
    private logger: Logg
    private featureTraceService: FeatureTraceService

    constructor() {
        this.logger = DI.get(Logg)
        this.featureTraceService = DI.get(FeatureTraceService)
    }

    getRouter(): Router {
        const router = Router()

        router.get('/getTraces',async (req: Request, res: Response) => {
            let trace_data_obj: any = req.body
            let resp: any = this.featureTraceService.processTracedata(trace_data_obj)
            res.json({ response: resp })
        })
        return router
    }
}


