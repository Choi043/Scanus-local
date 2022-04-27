import { Body, Controller, Param, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminRoleType } from "src/domains/admin/domain/admin.role";
import { QRStateDto } from "../application/dto/qr.state";
import { QRStateChangeService } from "../application/qr.state-change.service";

@Controller('qr')
export class QRStateChangeController {
    constructor(
        private readonly qrStateChangeService: QRStateChangeService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminRoleType.MASTER)
    async qrStateChange(
        @Param('id') id: number,
        @Body() qrStateChangeDto: QRStateDto
    ) {
        return await this.qrStateChangeService.stateChange(id, qrStateChangeDto);
    }

    // @Post()
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Roles(AdminRoleType.MASTER)
    // async qrStateInfoChange(
    //     @Param('id') id: number,
    //     @Body() qrStateChangeDto: QRStateDto
    // ) {
    //     return await this.qrStateChangeService.stateInfoChange(id, qrStateChangeDto);
    // }
}