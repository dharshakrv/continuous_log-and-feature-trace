import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { SubType } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class SubTypeRepository extends Repository {

  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  async getAll(): Promise<SubType[]> {
    return await new Promise<SubType[]>((resolve, reject) => {
      SubType.findAll().then((results: SubType[] | null) => {
        if (results === null) {
          resolve([]);
        }
        resolve(results!);
      }).catch((error: any) => {
        reject(error);
      });
    });
  }

  async getByObject(code: string): Promise<SubType[]> {
    return await new Promise<SubType[]>((resolve, reject) => {
      SubType.findAll({
        where: {
          parent_id: code
        }
      }).then((results: SubType[] | null) => {
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
