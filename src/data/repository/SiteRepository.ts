import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { Sites } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class SitesRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  async getAll(): Promise<Sites[]> {
    return await new Promise<Sites[]>((resolve, reject) => {
      Sites.findAll().then((results: Sites[] | null) => {
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