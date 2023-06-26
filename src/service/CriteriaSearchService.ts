import { MongoConnection } from "../config/MongoConnection"
import { DI } from "../di/DIContainer"
import { Logger } from "../logger/Logger"
import { DBService } from "./DBService"

export class CriteriaSearchService {

    private logger: Logger
    private dbService: DBService

    constructor() {
        this.logger = DI.get(Logger)
        this.dbService = DI.get(DBService)
    }
    
    async createNewCriteria(criteriaObject: any) {
        return new Promise(async(resolve, reject) => {
            const criteria_dataObject: any = {
                criteria_name: criteriaObject.name,
                criteria_fieldname: criteriaObject.dataField,
                status: 'ACTIVE',
                createdAt: new Date(),
                updatedAt: new Date()
            }

            await this.dbService.insertNew('criteria_data', criteria_dataObject)
            .then((response: any) => {
                resolve(response)
            })
            .catch((err: any) => {
                reject(err)
            })
        })
    }

    async fetchActiveCriterias() {
        return new Promise(async(resolve, reject) => {
            const whereObj = { status: 'ACTIVE' }
            await this.dbService.getByQuery('criteria_data', whereObj)
            .then((response: any) => { resolve(response) })
            .catch((err: any) => { reject(err) })
        })
    }
}

