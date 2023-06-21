import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { DataObjectKeys } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class DataObjectKeyRepository extends Repository {
    private logger: Logger;

    constructor() { 
        super();
        this.logger = DI.get(Logger);
    }

    async getAll(): Promise<DataObjectKeys[]> {
        return await new Promise<DataObjectKeys[]>((resolve, reject) => {
            DataObjectKeys.findAll().then((results: DataObjectKeys[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getByDataObject(objectId: number): Promise<DataObjectKeys[]> {
        return await new Promise<DataObjectKeys[]>((resolve, reject) => {
            DataObjectKeys.findAll({
                where: {
                    data_object_id: objectId
                }
            }).then((results: DataObjectKeys[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getByCodeAndObjectCode(code: string, objectId: number): Promise<DataObjectKeys> {
        return await new Promise<DataObjectKeys>((resolve, reject) => {
            DataObjectKeys.findOne({
                where: {
                    code: code,
                    data_object_id: objectId
                }
            }).then((results: DataObjectKeys | null) => {
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}
