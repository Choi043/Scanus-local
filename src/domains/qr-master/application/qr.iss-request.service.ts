import { InjectRepository } from "@nestjs/typeorm";
import { QRRepository } from "../domain/qr.repository";
import { QRIssuanceRequestDto } from "./dto/qr.issuance-request";

export class QRIssRequestService {
    constructor(
        @InjectRepository(QRRepository)
        private readonly qrRepository: QRRepository
    ) {}
    
    async issuance(qrIssuanceRequestDto: QRIssuanceRequestDto): Promise<QRIssuanceRequestDto> {
        return await this.qrRepository.issuanceQR(qrIssuanceRequestDto)
    }
}