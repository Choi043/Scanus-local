import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminRoleType } from "src/domains/admin/domain/admin.role";
import { CompanyRegisterService } from "../application/company.register.service";
import { CompanyRegisterDto } from "../application/dto/company.register";

@Controller('company')
export class CompanyRegisterController {
    constructor(
        private readonly companyRegisterService : CompanyRegisterService
    ) {}

    @Post('/register')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminRoleType.MASTER)
    async registerCompany(@Body() companyRegisterDto: CompanyRegisterDto): Promise<any> {
        return await this.companyRegisterService.register(companyRegisterDto);
    }
}