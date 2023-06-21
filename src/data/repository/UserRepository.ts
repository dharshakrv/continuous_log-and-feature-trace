import { Repository } from "./Repository";
import { Logger } from "../../logger/Logger";
import { Users } from "../entity/init-models";
import { DI } from "../../di/DIContainer";

export class UserRepository extends Repository {
  private logger: Logger;

  constructor() {
    super();
    this.logger = DI.get(Logger);
  }

  async getAll(): Promise<Users[]> {
    return await new Promise<Users[]>((resolve, reject) => {
      Users.findAll().then((results: Users[] | null) => {
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