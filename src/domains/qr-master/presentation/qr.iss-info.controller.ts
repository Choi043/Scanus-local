import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CurrentChannel } from "src/commons/decorator/decorator.current.req";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { QRIssInfoService } from "../application/qr.iss-info.service";

@Controller('qr')
export class QrIssInfoController {
    constructor(
        private readonly qrIssInfoService: QRIssInfoService
    ) { }

    @Get('/info/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async getQRInfo(@Param('id') id: number) {
        return this.qrIssInfoService.getQRInfo(id);
    }

    @Get('/list')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async getAdminList(
        @CurrentChannel() req: any) {
        let { condition, find } = req;
        return await this.qrIssInfoService.infoChannel(condition, find);
    }
}