import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { FeatureSodView } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class FeatureSODViewRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  getByFeatureId(featureId: number): Promise<FeatureSodView[]> {
    return new Promise<FeatureSodView[]>((resolve, reject) => {
        FeatureSodView.findAll({where: {
            feature_id: featureId
        }}).then((featureSodViews: FeatureSodView[] | null) => {
            if (featureSodViews === null) {
                return resolve([]);
            }
            return resolve(featureSodViews);
        }).catch(exception => {
            this.logger.error(`Unable to fetch sodViews by featureId + ${exception}`);
        })
    });
  }
}