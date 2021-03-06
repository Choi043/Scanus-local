import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { QRIssuanceRequestDto } from "../application/dto/qr.issuance-request";
import { QRIssRequestService } from "../application/qr.iss-request.service";

@Controller('qr')
export class QRIssRequestController {
    constructor(
        private readonly qrIssRequestService: QRIssRequestService
    ) {}

    @Post('/register')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async qrIssuanceRequest(@Body() qrIssuanceRequestDto: QRIssuanceRequestDto): Promise<any> {
        return await this.qrIssRequestService.issuance(qrIssuanceRequestDto);
    }
}