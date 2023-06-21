import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { OrganizationType } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class OrganizationTypeRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  async getAll(): Promise<OrganizationType[]> {
    return await new Promise<OrganizationType[]>((resolve, reject) => {
      OrganizationType.findAll().then((results: OrganizationType[] | null) => {
        if (results === null) {
          resolve([]);
        }
        resolve(results!);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  async getByObject(code: string): Promise<OrganizationType[]> {
    return await new Promise<OrganizationType[]>((resolve, reject) => {
      OrganizationType.findAll({
        where: {
          parent_id: code
        }
      }).then((results: OrganizationType[] | null) => {
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
