import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { CompanyEntity } from "../domain/company.entity";
import { CompanyRepository } from "../domain/company.repository";

@Injectable()
export class CompanyInfoService {
    constructor(
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository
    ) { }

    async getCompanyInfo(cmpny_idx: number) {
        const companyFind = await this.companyRepository.findOne({
            where: { cmpny_idx },
        })

        if (!companyFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }

        return companyFind;
    }

    async findByCompanyOptions(options: FindOneOptions<CompanyEntity>): Promise<CompanyEntity[]> {        // id, index가 아닌 다른 값으로 entity를 찾으려 할 때,
        const fieldFind = await this.companyRepository.find(options);

        if (!fieldFind) {
            throw new BadRequestException(`${options} 정보가 존재하지 않습니다.`)
        }
        return fieldFind;
    }
}