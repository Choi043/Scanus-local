import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminRoleType } from "src/domains/admin/domain/admin.role";
import { ProjectRegisterDto } from "../application/dto/project.register";
import { ProjectRegisterService } from "../application/project.register.service";

@Controller('project')
export class ProjectRegisterController {
    constructor(
        private readonly projectRegisterService: ProjectRegisterService
    ) {}

    @Post('/register')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminRoleType.MASTER)
    async registerCompany(@Body() projectRegisterDto: ProjectRegisterDto): Promise<any> {
        return await this.projectRegisterService.register(projectRegisterDto);
    }
}