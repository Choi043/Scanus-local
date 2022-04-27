import { Controller } from "@nestjs/common";
import { QRDetailRegisterService } from "../application/qr-detail.register.service";

@Controller('qr-detail')
export class QRDetailRegisterController {
    constructor(
        private readonly qrDetailRegisterService: QRDetailRegisterService
    ) {}

    
}