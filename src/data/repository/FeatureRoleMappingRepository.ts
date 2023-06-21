import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { FeatureRoleMapping } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class FeatureRoleMappingRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  async getAll(): Promise<FeatureRoleMapping[]> {
    return await new Promise<FeatureRoleMapping[]>((resolve, reject) => {
      let where = {};
      FeatureRoleMapping.findAll(where).then((results: FeatureRoleMapping[] | null) => {
        if (results === null) {
          resolve([]);
        }
        resolve(results!);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  async getByFeatureId(featureId: number): Promise<FeatureRoleMapping[]> {
    return await new Promise<FeatureRoleMapping[]>((resolve, reject) => {
      let where = {
        feature_id: featureId
      };
      FeatureRoleMapping.findAll({where}).then((results: FeatureRoleMapping[] | null) => {
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
