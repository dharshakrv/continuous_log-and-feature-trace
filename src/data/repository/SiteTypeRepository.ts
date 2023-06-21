import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger"
import { SiteType } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class SiteTypeRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  async getAll(): Promise<SiteType[]> {
    return await new Promise<SiteType[]>((resolve, reject) => {
      SiteType.findAll().then((results: SiteType[] | null) => {
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