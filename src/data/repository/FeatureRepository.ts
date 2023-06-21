import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { Features, FeatureExternalConfig } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class FeatureRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  findById(featureId: number): Promise<Features> {
    return new Promise<Features>((resolve, reject) => {
      Features.findOne({
        where: {
          id: featureId
        },
        include: [Features.associations.FeatureSodViews]
      }).then((results: Features | null) => {
        if (results === null) {
          reject('Invalid Code');
        }
        resolve(results!);
      });
    });
  }

  findByCode(code: string, appCode: string): Promise<Features> {
    return new Promise<Features>((resolve, reject) => {
      Features.findOne({
        where: {
          code: code,
          application_code: appCode
        },
        // include: [Features.associations.FeatureSodViews]
      }).then((results: Features | null) => {
        if (results === null) {
          reject('Invalid Code');
        }
        resolve(results!);
      });
    });
  }

  async getAll(): Promise<Features[]> {
    return await new Promise<Features[]>((resolve, reject) => {

      Features.findAll({
        include: [Features.associations.FeatureSodViews]
      }).then((results: Features[] | null) => {
        if (results === null) {
          resolve([]);
        }
        resolve(results!);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  async getByFeatureCodeExternal(featureId: number): Promise<FeatureExternalConfig | null> {
    return await new Promise<FeatureExternalConfig | null>((resolve, reject) => {
      FeatureExternalConfig.findOne({
        where: {
          feature_id: featureId
        }
      }).then((results: FeatureExternalConfig | null) => {
        resolve(results);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }
}