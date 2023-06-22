import { Request, Response, Router, response } from "express";
import { Controller } from "./Controller";
import { CriteriaSearchService } from "../service/CriteriaSearchService";
import { DI } from "../di/DIContainer";

export class CriteriaSearchController implements Controller {

    private criteriaSearchService: CriteriaSearchService

    constructor() {
        this.criteriaSearchService = DI.get(CriteriaSearchService)
    }

    getRouter(): Router {
        const router = Router()

        router.post('/create', async (req: Request, res: Response) => {
            let criteriaBody = req.body.criteria
            await this.criteriaSearchService.createNewCriteria(criteriaBody)
            .then((response: any) => { res.json({ status: "success", response: response }) })
            .catch((err: any) => { res.json({ status: "failed", response: err }) })
        })

        router.post('/fetchAll', async (req: Request, res: Response) => {
            await this.criteriaSearchService.fetchActiveCriterias()
            .then((response: any) => { res.json({ status: "success", response: response }) })
            .catch((err: any) => { res.json({ status: "failed", response: err }) })
        })

        return router
    }
}