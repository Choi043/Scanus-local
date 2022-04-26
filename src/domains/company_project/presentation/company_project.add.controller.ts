import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminRoleType } from "src/domains/admin/domain/admin.role";
import { CompanyProjectAddService } from "../application/company_project.add.service";
import { CompanyProjectInfoDto } from "../application/dto/company_project.info";

@Controller('company-project')
export class CompanyProjectAddController {
    constructor(
        private readonly companyProjectAddService : CompanyProjectAddService
    ) {}

    // @Post('/register')
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Roles(AdminRoleType.MASTER)
    // async registerCompany(@Body() companyProjectInfoDto: CompanyProjectInfoDto): Promise<any> {
    //     return await this.companyProjectAddService.register(companyRegisterDto);
    // }
}