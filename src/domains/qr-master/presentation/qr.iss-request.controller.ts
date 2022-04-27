import { Body, Controller, Post } from "@nestjs/common";
import { QRIssuanceRequestDto } from "../application/dto/qr.issuance-request";
import { QRIssRequestService } from "../application/qr.iss-request.service";

@Controller('qr')
export class QRIssRequestController {
    constructor(
        private readonly qrIssRequestService: QRIssRequestService
    ) {}

    @Post('/request')
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Roles(AdminRoleType.MASTER)
    async registerCompany(@Body() qrIssuanceRequestDto: QRIssuanceRequestDto): Promise<any> {
        return await this.qrIssRequestService.issuance(qrIssuanceRequestDto);
    }
}