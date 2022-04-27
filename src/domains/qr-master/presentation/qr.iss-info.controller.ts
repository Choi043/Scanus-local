import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CurrentRequest } from "src/commons/decorator/decorator.current.req";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminRoleType } from "src/domains/admin/domain/admin.role";
import { QRIssInfoService } from "../application/qr.iss-info.service";

@Controller('qr')
export class QrIssInfoController {
    constructor(
        private readonly qrIssInfoService : QRIssInfoService
    ){}

    @Get('/info/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminRoleType.MASTER)
    async getQRInfo(@Param('id') id: number) {
        return this.qrIssInfoService.getQRInfo(id);
    }

    @Get('/list')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminRoleType.MASTER)
    async getAdminList(
        @CurrentRequest() req: Request) {
            let condition: string
            let find: string
            if( req === undefined ) {
                condition = 'qr_idx'
                find = ''
            } else {
                condition = req[0]
                find = String(req[1])
            }
            return await this.qrIssInfoService.infoChannel( condition, find );
        }
}