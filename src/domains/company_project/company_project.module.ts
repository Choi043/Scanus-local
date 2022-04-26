import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyProjectRepository } from "./domain/company_project.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyProjectRepository])
    ],
    exports: [],
    controllers: [],
    providers: [],
})
export class CompanyProjectModule {}