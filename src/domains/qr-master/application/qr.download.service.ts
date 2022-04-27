import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QRRepository } from "../domain/qr.repository";

@Injectable()
export class QRDownloadService {
    constructor(
        @InjectRepository(QRRepository)
        private readonly qrRepository: QRRepository
    ) {}

    
}