import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QRDetailRepository } from "../domain/qr-detail.repository";
import { QRDetailRegisterDto } from "./dto/qr-detail.register";
import { QRDetailColumnCreateService } from "./qr-detail.column-create.service";

@Injectable()
export class QRDetailRegisterService {
    constructor(
        @InjectRepository(QRDetailRepository)
        private readonly qrDetailRepository: QRDetailRepository,
        private readonly qrDetailColumnCreateService: QRDetailColumnCreateService,
    ) {}
    
    async register(qrDetailRegister: QRDetailRegisterDto) {
        const group = await this.qrDetailColumnCreateService.dataGroup(qrDetailRegister)
        return await this.qrDetailRepository.register(qrDetailRegister, group);
    }
}