import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QREntity } from "../domain/qr.entity";
import { QRRepository } from "../domain/qr.repository";
import { QRStateDto } from "./dto/qr.state";

@Injectable()
export class QRStateChangeService {
    constructor(
        @InjectRepository(QRRepository)
        private readonly qrRepository: QRRepository
    ) { }

    async stateChange(qr_idx: number, qrStateChange: QRStateDto): Promise<QRStateDto> {
        const qrFind = await this.qrRepository.findOne({
            where: { qr_idx }
        })

        const checkChannel: number = Number(qrFind.qr_state)

        if (
            Number(qrStateChange.qr_state) > checkChannel + 1 ||
            Number(qrStateChange.qr_state) === checkChannel ||
            Number(qrStateChange.qr_state) < checkChannel
        ) {
            throw new BadRequestException('현재 등록 상태를 확인해주세요.')
        }
        qrFind.qr_state = qrStateChange.qr_state;

        return await this.qrRepository.save(qrFind);
    }

    async delyInfoChange(qr_idx: number, qrStateChange: QRStateDto): Promise<QRStateDto> {
        const qrFind = await this.qrRepository.findOne({
            where: { qr_idx }
        })
        
        if(qrFind.qr_state === '2') {
            qrFind.recrt_nm = qrStateChange.recrt_nm,
            qrFind.recrt_tel = qrStateChange.recrt_tel,
            qrFind.dely_nm = qrStateChange.dely_nm,
            qrFind.dely_num = qrStateChange.dely_num
        }
        return await this.qrRepository.save(qrFind);
    }
}