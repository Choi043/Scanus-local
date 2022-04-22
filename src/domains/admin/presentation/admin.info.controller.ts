import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminInfoService } from "../application/admin.info.service";
import { AdminInfoDto } from "../application/dto/admin.info";
import { AdminEntity } from "../domain/admin.entity";
import { AdminRoleType } from "../domain/admin.role";

@Controller('admin')
export class AdminInfoController {
    constructor(private readonly adminInfoService: AdminInfoService) { }

    @Get('/info')
    @UseGuards(JwtAuthGuard)
    async getInfo(@CurrentUser() user: AdminEntity) {
        const { admin_idx } = user;
        return this.adminInfoService.getAdminInfo(admin_idx);
    }

    @Get('/info/:index')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminRoleType.MASTER)
    async getAdminInfo(@Param('index') index: number) {
        return this.adminInfoService.getAdminInfo(index);
    }

    @Get('/infolist')
    @UseGuards(JwtAuthGuard)
    async getInfoList(
        @Query('take') take: number,
        @Query('page') page: number,
    ) {
        return this.adminInfoService.list({ take, page });
    }

}