import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyRepository } from "../domain/company.repository";

@Injectable()
export class CompanyInfoService {
    constructor(
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository
    ) { }

    async getCompanyInfo(admin_idx: number) {
        const adminFind = await this.companyRepository.findOne({
            where: { admin_idx },
        })

        if (!adminFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }

        return adminFind;
    }
}