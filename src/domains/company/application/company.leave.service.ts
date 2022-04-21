import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyEntity } from "../domain/company.entity";
import { CompanyRepository } from "../domain/company.repository";
import { CompanyEditDto } from "./dto/company.edit";

@Injectable()
export class CompanyLeaveService {
    constructor(
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository
    ) { }

    async leaveCompany(cmpny_idx: number, editCompany: CompanyEditDto): Promise<CompanyEntity> {
        const companyFind = await this.companyRepository.findOne(cmpny_idx);

        companyFind.leave_fl = editCompany.leave_fl;

        await this.companyRepository.save(companyFind)

        return companyFind;
    }
}