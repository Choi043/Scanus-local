import { EntityRepository, Repository } from "typeorm";
import { CompanyProjectEntity } from "./company_project.entity";

@EntityRepository(CompanyProjectEntity)
export class CompanyProjectRepository extends Repository<CompanyProjectEntity> {}