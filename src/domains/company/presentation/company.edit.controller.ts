import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminRoleType } from "src/domains/admin/domain/admin.role";
import { CompanyEditService } from "../application/company.edit.service";
import { CompanyEditDto } from "../application/dto/company.edit";
import { CompanyEntity } from "../domain/company.entity";

@Controller('company')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(AdminRoleType.MASTER)
export class CompanyEditController {
    constructor(
        private readonly companyEditService: CompanyEditService
    ){}

    @Patch('/edit/:id')
    @UsePipes(ValidationPipe)
    async editCompany(
        @Param('id') id: number,
        @Body() companyEditDto: CompanyEditDto
    ):Promise<CompanyEntity> {
        return this.companyEditService.edit(id, companyEditDto);
    }


}