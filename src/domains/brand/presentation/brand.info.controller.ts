import { Controller, Get, Param, Post, Query, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CurrentChannel } from "src/commons/decorator/decorator.current.req";
import { JwtAuthGuard, RefreshGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { BrandInfoService } from "../application/brand.info.service";

@Controller('brand')
export class BrandInfoController {
    constructor(
        private readonly brandInfoService: BrandInfoService
    ) { }

    @Get('/info/:id')
    @UseGuards(JwtAuthGuard)
    async getInfo(@Param('id') id: number) {
        return this.brandInfoService.getBrandInfo(id);
    }

    @Get('/infolist')
    @UseGuards(JwtAuthGuard)
    async list() { return this.brandInfoService.allFindlist(); }

    @Post('/list')
    @UseGuards(RefreshGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async getAdminList(
        @CurrentChannel() req: any) {
            let { condition, find } = req;
        return await this.brandInfoService.infoChannel(condition, find);
    }
}