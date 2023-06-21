import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { DataObjects } from "../entity/init-models";
import { DI } from "../../di/DIContainer";
import { Op } from 'sequelize';
import { ObjectType } from "../../request/DataObjectRequests";

export class DataObjectRepository extends Repository {
    private logger: Logger;

    constructor() { 
        super();
        this.logger = DI.get(Logger);
    }

    findById(objectId: number): Promise<DataObjects | undefined> {
        return new Promise<DataObjects | undefined>((resolve, reject) => {
            let where = {
                data_object_id: objectId
            }
            DataObjects.findOne({
                where,
                include: [ DataObjects.associations.DataObjectKeys ]
            }).then((result: DataObjects | null) => {
                if (result === null) {
                    return resolve(undefined);
                }
                return resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    getByObjectId(objectId: number): Promise<DataObjects | undefined> {
        return new Promise<DataObjects | undefined>((resolve, reject) => {
            let where = {
                data_object_id: objectId
            }
            DataObjects.findOne({
                where,
                include: [ DataObjects.associations.DataObjectIdDataObjectKeys ]
            }).then((result: DataObjects | null) => {
                if (result === null) {
                    return resolve(undefined);
                }
                return resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    getByObjectCodeAndApplicationCode(objectCode: string, applicationCode: string): Promise<DataObjects | undefined> {
        return new Promise<DataObjects | undefined>((resolve, reject) => {
            let where = {
                code: objectCode,
                application_code: applicationCode
            }
            DataObjects.findOne({
                where,
                include: [ DataObjects.associations.DataObjectKeys ]
            }).then((result: DataObjects | null) => {
                if (result === null) {
                    return resolve(undefined);
                }
                return resolve(result);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getAll(objectType?: ObjectType): Promise<DataObjects[]> {
        return await new Promise<DataObjects[]>((resolve, reject) => {
            let where = {};
            if (objectType !== undefined && objectType !== null) {
                where = {
                    [Op.or]: [ {object_type: objectType}, {object_type: 'COMMON_OBJECT'} ]
                };
            }
            DataObjects.findAll({
                where: where,
                include: [ DataObjects.associations.DataObjectKeys ]
            }).then((results: DataObjects[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
}
