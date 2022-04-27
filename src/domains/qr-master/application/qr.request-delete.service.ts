import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QRRepository } from "../domain/qr.repository";
import { QRReqestStateDto } from "./dto/qr.request-update";

@Injectable()
export class QRReqestDeleteService {
    constructor(
        @InjectRepository(QRRepository)
        private readonly qrRepository: QRRepository
    ) { }

    async requestDelete(qr_idx: number, qrUpdate: QRReqestStateDto) {
        const qrFind = await this.qrRepository.findOne({
            where: { qr_idx }
        })

        if (qrFind.qr_state !== '1') {
            throw new BadRequestException('등록중이므로 삭제할 수 없습니다.')
        }
        else {
            qrFind.del_yn = qrUpdate.del_yn;

            await this.qrRepository.save(qrFind)

            return qrFind;
        }
    }
}