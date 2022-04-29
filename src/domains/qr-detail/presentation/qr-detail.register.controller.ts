import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { QRDetailRegisterDto } from "../application/dto/qr-detail.register";
import { QRDetailRegisterService } from "../application/qr-detail.register.service";

@Controller('qr-detail')
export class QRDetailRegisterController {
    constructor(
        private readonly qrDetailRegisterService: QRDetailRegisterService
    ) {}

    @Post('/register')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async qrDetailRegister(@Body() qrDetailRegisterDto: QRDetailRegisterDto) {
        return await this.qrDetailRegisterService.register(qrDetailRegisterDto);
    }
    
    @Post('/test')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async test(@Body() qrDetailRegisterDto: QRDetailRegisterDto) {
        return await this.qrDetailRegisterService.register(qrDetailRegisterDto);
    }
}