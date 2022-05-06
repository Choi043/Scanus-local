import { AdminFindService } from 'src/domains/admin/application/admin.find.service';
import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CurrentChannel } from "src/commons/decorator/decorator.current.req";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { JwtAuthGuard, RefreshGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminInfoService } from "../application/admin.info.service";
import { AdminEntity } from "../domain/admin.entity";
import { AdminType } from "../domain/admin.role";

@Controller('admin')
export class AdminInfoController {
    constructor(
        private readonly adminInfoService: AdminInfoService,
        private readonly adminFindService: AdminFindService,
    ) { }

    @Get('/info')
    @UseGuards(RefreshGuard)
    async getInfo(@CurrentUser() user: AdminEntity) {
        const { admin_idx } = user;
        return this.adminFindService.findByIndex(admin_idx);
    }

    @Get('/info/:index')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async getAdminInfo(@Param('index') index: number) {
        return this.adminFindService.findByIndex(index);
    }

    @Get('/infolist')
    @UseGuards(JwtAuthGuard)
    async getInfoList(
        @Query('take') take: number,
        @Query('page') page: number,
    ) {
        return this.adminInfoService.list({ take, page });
    }

    @Post('/list')
    @UseGuards(RefreshGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async getAdminList(
        @CurrentChannel() req: any) {
            let { condition, find } = req;
        return await this.adminInfoService.infoChannel(condition, find);
    }

}