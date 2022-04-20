import { EntityRepository, Repository } from "typeorm";
import { CompanyRegisterDto } from "../application/dto/company.register";
import { CompanyEntity } from "./company.entity";

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {

    async addCompany(companyRegisterDto: CompanyRegisterDto): Promise<CompanyEntity> {
        const { cmpny_nm, cmpny_cd } = companyRegisterDto

        const newCompany: CompanyEntity = this.create({
            cmpny_nm,
            cmpny_cd,
        })

        return await this.save(newCompany);
    }
}