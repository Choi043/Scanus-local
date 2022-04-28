import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyRepository } from "../domain/company.repository";
import { CompanyRegisterDto } from "./dto/company.register";

@Injectable()
export class CompanyRegisterService {
    constructor(
        @InjectRepository(CompanyRepository)
        private readonly companyRepository: CompanyRepository
    ) { }

    async register(companyRegisterDto: CompanyRegisterDto): Promise<CompanyRegisterDto> {
        return await this.companyRepository.addCompany(companyRegisterDto);
    }
}