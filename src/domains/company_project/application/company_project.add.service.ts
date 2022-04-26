import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CompanyProjectRepository } from "../domain/company_project.repository";

@Injectable()
export class CompanyProjectAddService {
    constructor(
        @InjectRepository(CompanyProjectRepository)
        private readonly CompanyProjectRepository : CompanyProjectRepository
    ) {}
    
}