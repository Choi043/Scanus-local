import { EntityRepository, Repository } from "typeorm";
import { AdminTokenEntity } from "./admin.token.entity";

@EntityRepository(AdminTokenEntity)
export class AdminTokenRepository extends Repository<AdminTokenEntity> {}