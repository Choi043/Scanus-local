import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { QRStateDto } from "../application/dto/qr.state";
import { QRStateChangeService } from "../application/qr.state-change.service";

@Controller('qr')
export class QRStateChangeController {
    constructor(
        private readonly qrStateChangeService: QRStateChangeService
    ) {}

    @Post('/state-change/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async qrStateChange(
        @Param('id') id: number,
        @Body() qrStateChangeDto: QRStateDto
    ) {
        return await this.qrStateChangeService.stateChange(id, qrStateChangeDto);
    }

    @Post('/state-info/:id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async qrStateInfoChange(
        @Param('id') id: number,
        @Body() qrStateChangeDto: QRStateDto
    ) {
        return await this.qrStateChangeService.delyInfoChange(id, qrStateChangeDto);
    }
}