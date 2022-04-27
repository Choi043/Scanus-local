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

    async stateChange(qr_idx: number, qrStateChange: QRStateDto): Promise<QREntity> {
        const qrFind = await this.qrRepository.findOne({
            where: { qr_idx }
        })

        const checkChannel:number = Number(qrFind.qr_state)

        if( checkChannel + 1 > Number(qrStateChange.qr_state)) {
            throw new BadRequestException('현재 등록 상태를 확인해주세요.')
        }
        else if ( checkChannel === 2){
            this.stateInfoChange(qrStateChange, qrFind)
        }

        qrFind.qr_state = qrStateChange.qr_state;

        await this.qrRepository.save(qrFind)

        return qrFind;
    }

    public async stateInfoChange(qrStateChange: QRStateDto, qrInfo: QREntity) {
        
        // qrStateChange.dely_nm = qrInfo.dely_nm,
        // qrStateChange.dely_num = qrInfo.dely_num,
        // qrStateChange.recrt_nm = qrInfo.recrt_nm,
        // qrStateChange.recrt_tel = qrInfo.recrt_tel        
        
        return {
        }
    }
}