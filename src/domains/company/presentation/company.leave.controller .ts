import { Body, Controller, Get, Param, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { CompanyLeaveService } from "../application/company.leave.service";
import { CompanyEditDto } from "../application/dto/company.edit";
import { CompanyEntity } from "../domain/company.entity";

@Controller('company')
export class CompanyLeaveController {
    constructor(
        private readonly companyLeaveService: CompanyLeaveService
    ){}

    @Patch('/leave/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async leaveCompany(
        @Param('id') id: number,
        @Body('leave_fl') companyLeaveDto: CompanyEditDto
    ):Promise<CompanyEntity> {
        return this.companyLeaveService.leaveCompany(id, companyLeaveDto);
    }


}