import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { Orchestration } from "../entity/init-models";
import { DI } from "../../di/DIContainer";
import { FeatureQueryType } from "../model/FeatureQueryType";

export class OrchestrationRepository extends Repository {
    private logger: Logger;

    constructor() {
        super();
        this.logger = DI.get(Logger);
    }

    async findBy(dataObjectId: number, queryType: FeatureQueryType): Promise<Orchestration[]> {
        return new Promise<Orchestration[]>((resolve, reject) => {
            Orchestration.findAll({
                where: {
                    source_object_id: dataObjectId,
                    source_action_code: queryType
                },
                include: [Orchestration.associations.OrchestrationActions]
            }).then((orchestrations: Orchestration[]) => {
                if (orchestrations === null) {
                    resolve([]);
                }
                resolve(orchestrations);
            });
        });
    }

    async getAll(): Promise<Orchestration[]> {
        return await new Promise<Orchestration[]>((resolve, reject) => {
            Orchestration.findAll({
                include: [Orchestration.associations.OrchestrationActions]
            }).then(async (orchestrations: Orchestration[]) => {

                if (orchestrations === null) {
                    resolve([]);
                }
                let orchestrationObj: Orchestration[] = await Orchestration.findAll({
                    include: [Orchestration.associations.OrchestrationActions]
                })
                resolve(orchestrationObj);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

}
