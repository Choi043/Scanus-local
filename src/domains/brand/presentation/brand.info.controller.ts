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
        @CurrentChannel() req: Request) {       // req.body[0] ~ [1] 형식 req[0] ~ [1]로 대체하기 위한 데코레이터
        let condition: string
        let find: string
        if (req === undefined) {       // 입력 값이 없을 시(초기화 형식)
            condition = 'brand_idx'
            find = ''
        } else {
            condition = req[0]      // 조회 조건
            find = req[1]           // 입력 값
        }
        return await this.brandInfoService.infoChannel(condition, find);
    }
}