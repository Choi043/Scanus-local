import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyProjectRepository } from "../domain/company_project.repository";
import { CompanyProjectInfoDto } from "./dto/company_project.info";

@Injectable()
export class CompanyProjectAddService {
    constructor(
        @InjectRepository(CompanyProjectRepository)
        private readonly CompanyProjectRepository : CompanyProjectRepository
    ) {}
    
    async register(companyProjectInfoDto: CompanyProjectInfoDto) {
        return await this.CompanyProjectRepository.register(companyProjectInfoDto);
    }
}