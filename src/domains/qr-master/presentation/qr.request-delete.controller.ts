import { Body, Controller, Delete, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { QRReqestStateDto } from "../application/dto/qr.request-update";
import { QRReqestDeleteService } from "../application/qr.request-delete.service";

@Controller('qr')
export class QRReqestDeleteController {
    constructor(
        private readonly qrRequestDeleteService: QRReqestDeleteService
    ) { }

    @Delete('/delete/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async requestDelete(
        @Param('id') id: number,
        @Body() qrReqestDeleteDto: QRReqestStateDto
        ): Promise<any> {
        return await this.qrRequestDeleteService.requestDelete(id, qrReqestDeleteDto);
    }
}