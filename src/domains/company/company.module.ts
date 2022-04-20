import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyRepository } from "../company/domain/company.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyRepository])
    ],
    exports: [],
    controllers: [],
    providers: [],
})
export class CompanyModule {}