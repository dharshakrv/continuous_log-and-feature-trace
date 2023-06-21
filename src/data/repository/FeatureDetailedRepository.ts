import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { DI } from "../../di/DIContainer";
import { FeatureDetailed } from "../entity/init-models";
import { Features } from "../entity/init-models";

export class FeatureDetailedRepository extends Repository {
    private logger: Logger;

    constructor() {
        super();
        this.logger = DI.get(Logger);
    }

    async getByFeatureCode(code: any,appCode:any): Promise<FeatureDetailed | null> {
        return await new Promise<FeatureDetailed | null>((resolve, reject) => {
            FeatureDetailed.findOne({
                where: {
                    code: code,
                    application_code:appCode
                }
            }).then((results: FeatureDetailed | null) => {
                resolve(results);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
    async getByTrueOrFalseCode(code: any,appCode:any): Promise<FeatureDetailed | null> {
        return await new Promise<FeatureDetailed | null>((resolve, reject) => {
            FeatureDetailed.findOne({
                where: {
                    code: code,
                    application_code:appCode
                }
            }).then((results: FeatureDetailed | null) => {
                resolve(results);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }
    async getByCode(code: any): Promise<FeatureDetailed | null> {
        return await new Promise<FeatureDetailed | null>((resolve, reject) => {
            FeatureDetailed.findOne({
                where: {
                    code: code
                }
            }).then((results: FeatureDetailed | null) => {
                resolve(results);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getByFeatureId(id: any): Promise<FeatureDetailed | null> {
        return await new Promise<FeatureDetailed | null>((resolve, reject) => {
            FeatureDetailed.findOne({
                where: {
                    id: id
                   
                }
            }).then((results: FeatureDetailed | null) => {
                resolve(results);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getByCodes(id: any): Promise<FeatureDetailed[]> {
        return await new Promise<FeatureDetailed[]>((resolve, reject) => {
            FeatureDetailed.findAll({
                where: {
                    id: id
                   
                }
            }).then((results: FeatureDetailed[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }


    async getByApplicationAndFeatureCode(featureCode: string, applicationCode: string): Promise<FeatureDetailed | null> {
        return await new Promise<FeatureDetailed | null>((resolve, reject) => {
            FeatureDetailed.findOne({
                where: {
                    code: featureCode,
                    application_code: applicationCode
                }
            }).then((results: FeatureDetailed | null) => {
                resolve(results);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getAll(): Promise<FeatureDetailed[]> {
        return await new Promise<FeatureDetailed[]>((resolve, reject) => {

            FeatureDetailed.findAll().then((results: FeatureDetailed[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getByFeatureIds(ids: number[]): Promise<FeatureDetailed[]> {
        return await new Promise<FeatureDetailed[]>((resolve, reject) => {

            FeatureDetailed.findAll({
                where: {
                    id: ids
                } 
            }).then((results: FeatureDetailed[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }



    

    async getByDetails(id: any): Promise<FeatureDetailed[]> {
        return await new Promise<FeatureDetailed[]>((resolve, reject) => {
            let where = {};
            if (id !== undefined && id !== null) {
                where = {
                    where: {
                        id: id
                    }
                };
            }
            FeatureDetailed.findAll(where).then((results: FeatureDetailed[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getByApplicationCode(code: any): Promise<FeatureDetailed[]> {
        return await new Promise<FeatureDetailed[]>((resolve, reject) => {
            FeatureDetailed.findAll({
                where: {
                    application_code: code
                }
            }).then((results: FeatureDetailed[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getByBaseCode(code: any): Promise<FeatureDetailed[]> {
        return await new Promise<FeatureDetailed[]>((resolve, reject) => {
            let where = { application_code: code };
            FeatureDetailed.findAll({ where: where }).then((results: FeatureDetailed[] | null) => {
                if (results === null) {
                    resolve([]);
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getCountByCode(code: string): Promise<number> {
        return await new Promise<number>((resolve, reject) => {
            let where = {application_code:code};
           
            FeatureDetailed.count({
                where: where,
            }).then((results: number | null) => {
                if (results === null) {
                    results = 0;
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

    async getById(id: any): Promise<FeatureDetailed | null> {
        return await new Promise<FeatureDetailed | null>((resolve, reject) => {
            FeatureDetailed.findOne({
                where: {
                    data_object_id: id
                   
                }
            }).then((results: FeatureDetailed | null) => {
                resolve(results);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }

   

    async getDataObjCountById(id: any): Promise<number> {
        return await new Promise<number>((resolve, reject) => {
            
            Features.count({
                where: {
                    data_object_id: id
                }
            }).then((results: number | null) => {
                if (results === null) {
                    results = 0;
                }
                resolve(results!);
            }).catch((error: any) => {
                reject(error);
            });
        });
    }



    
}