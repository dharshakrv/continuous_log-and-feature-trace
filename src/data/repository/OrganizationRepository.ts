import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { Organization } from "../entity/init-models";
import { DI } from "../../di/DIContainer";
import { ObjectType } from "../../request/DataObjectRequests";

export class OrganizationRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }


  async getAll(objectType?: ObjectType): Promise<Organization[]> {
    return await new Promise<Organization[]>((resolve, reject) => {
      let where = {};
      if (objectType !== undefined && objectType !== null) {
        where = {
          where: {
            object_type: objectType
          }
        };
      }
      Organization.findAll(where).then((results: Organization[] | null) => {
        if (results === null) {
          resolve([]);
        }
        resolve(results!);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }


  async getOrgIdByRealm(realm: any): Promise<Organization | null> {
    return await new Promise<Organization | null>((resolve, reject) => {
      let whereObj = {
        realm: realm
      }
      Organization.findOne({ where: whereObj }).then((results: Organization | null) => {
        resolve(results);
      }).catch((error: any) => {
        reject(error);
      });
    })
  }

}
