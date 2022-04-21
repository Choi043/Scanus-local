import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntity } from "../domain/company.entity";
import { CompanyRepository } from "../domain/company.repository";
import { CompanyEditDto } from "./dto/company.edit";

@Injectable()
export class CompanyEditService {
    constructor(
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository
    ) { }

    async edit(cmpny_idx: number, editCompany: CompanyEditDto): Promise<CompanyEntity> {
        const companyFind = await this.companyRepository.findOne(cmpny_idx);

        companyFind.cmpny_nm = editCompany.cmpny_nm;
        companyFind.cmpny_cd = editCompany.cmpny_cd;

        await this.companyRepository.save(companyFind)

        return companyFind;
    }
}