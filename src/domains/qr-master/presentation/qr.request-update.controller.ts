import { Body, Controller, Param, Patch, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { QRReqestStateDto } from "../application/dto/qr.request-update";
import { QRReqestUpdateService } from "../application/qr.request-update.service";

@Controller('qr')
export class QRReqestUpdateController {
    constructor(
        private readonly qrRequestUpdateService: QRReqestUpdateService
    ) { }

    @Patch('/update/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async requestUpdate(
        @Param('id') id: number,
        @Body() qrReqestUpdateDto: QRReqestStateDto
        ): Promise<any> {
        return await this.qrRequestUpdateService.requestUpdate(id, qrReqestUpdateDto);
    }
}