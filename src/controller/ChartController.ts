import { Request, Response, Router } from "express";
import { DI } from "../di/DIContainer";
import { ChartService } from "../service/ChartService";
import { Controller } from "./Controller";

export class ChartController implements Controller {
    private chartService: ChartService

    constructor() {
        this.chartService = DI.get(ChartService)
    }

    getRouter(): Router {
        const router = Router()

        router.post('/featureTraceCharts', async (req: Request, res: Response) => {
            await this.chartService.featureChartService()
            .then((resp: any) => { res.json({ status: "success", response: resp }) })
            .catch((e: any) => { res.json({ status: "failed", e }) })
        })

        router.post('/featureListByResponseCode', async (req: Request, res: Response) => {
            let responseCode = req.body.response_code
            await this.chartService.featureTraceListByStatusCodes(responseCode)
            .then((resp: any) => { res.json({ status: "success", response: resp }) })
            .catch((e: any) => { res.json({ status: "failed", e }) })
        })

        router.post('/featureListByResponseTime', async (req: Request, res: Response) => {
            let responseTime1 = parseInt(req.body.repsonse_time1)
            let responseTime2 = parseInt(req.body.repsonse_time2)
            await this.chartService.featureTraceListByResponseTime(responseTime1, responseTime2)
            .then((resp: any) => { res.json({ status: "success", response: resp }) })
            .catch((e: any) => { res.json({ status: "failed", e }) })
        })
        return router
    }
}
