import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { CompanyLeaveService } from "../application/company.leave.service";
import { CompanyEditDto } from "../application/dto/company.edit";
import { CompanyEntity } from "../domain/company.entity";

@Controller('company')
// @UseGuards(AuthGuard, RoleGuard)
// @Roles(AdminType.MASTER)
export class CompanyLeaveController {
    constructor(
        private readonly companyLeaveService: CompanyLeaveService
    ){}

    @Patch('/leave/:id')
    @UsePipes(ValidationPipe)
    async leaveCompany(
        @Param('id') id: number,
        @Body('leave_fl') companyLeaveDto: CompanyEditDto
    ):Promise<CompanyEntity> {
        return this.companyLeaveService.leaveCompany(id, companyLeaveDto);
    }


}