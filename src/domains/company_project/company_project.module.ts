import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyProjectAddService } from "./application/company_project.add.service";
import { CompanyProjectRepository } from "./domain/company_project.repository";
import { CompanyProjectAddController } from "./presentation/company_project.add.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyProjectRepository])
    ],
    exports: [],
    controllers: [
        CompanyProjectAddController,
    ],
    providers: [
        CompanyProjectAddService,
    ],
})
export class CompanyProjectModule {}