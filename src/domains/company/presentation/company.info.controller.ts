import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { CompanyInfoService } from "../application/company.info.service";
import { CompanyEntity } from "../domain/company.entity";

@Controller('company')
export class CompanyInfoController {
    constructor(
        private readonly companyInfoService : CompanyInfoService
    ) {}
    
    @Get('/info/:id')
    @UseGuards(JwtAuthGuard)
    async getInfo(@Param('id') id: number) {
        return this.companyInfoService.getCompanyInfo(id);
    }
}