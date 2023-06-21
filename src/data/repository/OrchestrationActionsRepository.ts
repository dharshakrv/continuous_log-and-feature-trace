import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { OrchestrationActions } from "../entity/init-models";
import { DI } from "../../di/DIContainer";
import { Transaction } from "sequelize/types";
//import { ObjectType } from "../../request/OrchestrationActionsRequest";

export class OrchestrationActionsRepository extends Repository {
    private logger: Logger;

    constructor() { 
        super();
        this.logger = DI.get(Logger);
    }

    async create(obj: any, transaction?: Transaction): Promise<OrchestrationActions> {
        return await new Promise((resolve, reject) => {
            OrchestrationActions.create(obj, {transaction}).then((created: OrchestrationActions) => {
                resolve(created);
            }).catch((error: any) => {
                this.logger.error(error);
                reject(error); 
            });
        });
    }
    
}
