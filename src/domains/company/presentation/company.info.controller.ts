import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { CompanyInfoService } from "../application/company.info.service";
import { CompanyEntity } from "../domain/company.entity";

@Controller('company')
export class CompanyInfoController {
    constructor(
        private readonly companyInfoService : CompanyInfoService
    ) {}

    
    @Get('/info')
    @UseGuards(JwtAuthGuard)
    async getInfo(@CurrentUser() user: CompanyEntity) {
        const { cmpny_idx } = user;
        return this.companyInfoService.getCompanyInfo(cmpny_idx);
    }
}