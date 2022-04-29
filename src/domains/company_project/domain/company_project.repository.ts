import { EntityRepository, Repository } from "typeorm";
import { CompanyProjectInfoDto } from "../application/dto/company_project.info";
import { CompanyProjectEntity } from "./company_project.entity";

@EntityRepository(CompanyProjectEntity)
export class CompanyProjectRepository extends Repository<CompanyProjectEntity> {
    async register(companyProjectInfoDto: CompanyProjectInfoDto) {
        const { cmpny_idx, prjct_idx } = companyProjectInfoDto

        const tcpFind = this.create({
            cmpny_idx,
            prjct_idx,
        })

        return await this.save(tcpFind)
    }
}