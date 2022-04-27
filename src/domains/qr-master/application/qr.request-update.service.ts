import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QRRepository } from "../domain/qr.repository";
import { QRReqestStateDto } from "./dto/qr.request-update";

@Injectable()
export class QRReqestUpdateService {
    constructor(
        @InjectRepository(QRRepository)
        private readonly qrRepository: QRRepository
    ) { }

    async requestUpdate(qr_idx: number, qrUpdate: QRReqestStateDto) {
        const qrFind = await this.qrRepository.findOne({
            where: { qr_idx }
        })

        if (qrFind.qr_state !== '1') {
            throw new BadRequestException('등록중이므로 수정할 수 없습니다.')
        }
        else {
            // qrFind. = qrUpdate.code; 
            qrFind.sn_yn = qrUpdate.sn_yn;
            qrFind.scratch_type = qrUpdate.scratch_type;
            qrFind.secure_type = qrUpdate.secure_type;
            qrFind.unit_yn = qrUpdate.unit_yn;
            qrFind.pro_cnnc_yn = qrUpdate.pro_cnnc_yn;
            qrFind.surl_yn = qrUpdate.surl_yn;
            qrFind.blockchain_yn = qrUpdate.blockchain_yn;
            qrFind.qy = qrUpdate.qy;

            await this.qrRepository.save(qrFind)

            return qrFind;
        }
    }
}