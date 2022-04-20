import { EntityRepository, Repository } from "typeorm";
import { COPYEntity } from "./copy.entity";

@EntityRepository(COPYEntity)
export class COPYRepository extends Repository<COPYEntity> {}