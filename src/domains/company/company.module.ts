import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyRepository } from "../company/domain/company.repository";
import { CompanyEditService } from "./application/company.edit.service";
import { CompanyInfoService } from "./application/company.info.service";
import { CompanyRegisterService } from "./application/company.register.service";
import { CompanyEditController } from "./presentation/company.edit.controller";
import { CompanyInfoController } from "./presentation/company.info.controller";
import { CompanyRegisterController } from "./presentation/company.register.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([CompanyRepository])
    ],
    exports: [],
    controllers: [
        CompanyInfoController,
        CompanyRegisterController,
        CompanyEditController,
    ],
    providers: [
        CompanyInfoService,
        CompanyRegisterService,
        CompanyEditService,
    ],
})
export class CompanyModule {}