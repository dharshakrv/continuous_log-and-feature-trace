import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { DI } from "../../di/DIContainer";
import { ObjectMapping } from "../entity/init-models";

export class ObjectMappingRepository extends Repository{
    private logger: Logger;

    constructor() { 
        super();
        this.logger = DI.get(Logger);
    }

    async getBySourceAndTargetObjects(sourceObjectId: number, targetObjectId: number): Promise<ObjectMapping[]>{
        return await new Promise((resolve,reject)=>{
            ObjectMapping.findAll({
                where:{
                    source_object_id: sourceObjectId,
                    target_object_id: targetObjectId
                }
           }).then((results: ObjectMapping[] | null) => {
            if (results === null) {
              reject('Invalid source/target code');
            }
            resolve(results!);
          });
        })
    }
}