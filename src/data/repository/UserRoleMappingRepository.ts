import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { UserRoles } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class UserRoleMappingRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  async getAll(): Promise<UserRoles[]> {
    return await new Promise<UserRoles[]>((resolve, reject) => {
      let where = {};
      UserRoles.findAll(where).then((results: UserRoles[] | null) => {
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
