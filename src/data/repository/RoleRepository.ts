import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { Roles } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class RoleRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }


  async getAll(): Promise<Roles[]> {
    return await new Promise<Roles[]>((resolve, reject) => {
      let where = {};
      Roles.findAll(where).then((results: Roles[] | null) => {
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
