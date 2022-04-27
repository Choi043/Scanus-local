import { EntityRepository, Repository } from "typeorm";
import { QRIssuanceRequestDto } from "../application/dto/qr.issuance-request";
import { QREntity } from "./qr.entity";

@EntityRepository(QREntity)
export class QRRepository extends Repository<QREntity> {
    async issuanceQR(qrIssuanceRequestDto: QRIssuanceRequestDto): Promise<QREntity> {
        const { companyEntity, projectEntity, productEntity,
            qy, sn_yn, unit_yn, pro_cnnc_yn, secure_type, scratch_type, surl_yn, blockchain_yn, use_yn, qr_state,            
        } = qrIssuanceRequestDto

        const newIssuanceQR: QREntity = this.create({
            companyEntity, 
            projectEntity, 
            productEntity,
            qy, 
            sn_yn, 
            unit_yn, 
            pro_cnnc_yn, 
            secure_type, 
            scratch_type, 
            surl_yn, 
            blockchain_yn, 
            use_yn, 
            qr_state,
        })

        return await this.save(newIssuanceQR);
    }
}