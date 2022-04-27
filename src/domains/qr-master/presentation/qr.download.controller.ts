import { Controller } from "@nestjs/common";
import { QRDownloadService } from "../application/qr.download.service";

@Controller('qr')
export class QRDownloadController {
    constructor(
        private readonly qrDownloadService: QRDownloadService
    ) {}

    
}