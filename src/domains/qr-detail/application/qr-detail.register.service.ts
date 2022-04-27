import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QRDetailRepository } from "../domain/qr-detail.repository";

@Injectable()
export class QRDetailRegisterService {
    constructor(
        @InjectRepository(QRDetailRepository)
        private readonly qrDetailRepository: QRDetailRepository
    ) {}
    
}