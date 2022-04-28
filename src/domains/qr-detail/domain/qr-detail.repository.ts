import { EntityRepository, Repository } from "typeorm";
import { QRDetailRegisterDto } from "../application/dto/qr-detail.register";
import { QRDetailEntity } from "./qr-detail.entity";

@EntityRepository(QRDetailEntity)
export class QRDetailRepository extends Repository<QRDetailEntity> {
    async register(qrDetail: QRDetailRegisterDto, dataGroup: any) {
        let { qr_idx, cmpny_cd, unique_cd, unit, furl, access_key, scratch_type, secure_cd, upload_yn_access_key } = qrDetail
        const { secureCode, accesskey_cd, uniqueCode, full_url } = dataGroup


        const qrDetailEntity:QRDetailEntity = this.create({
            qr_idx,
            cmpny_cd,
            unique_cd: uniqueCode,
            unit,
            furl: full_url,
            access_key: accesskey_cd,
            scratch_type,
            secure_cd: secureCode,
            upload_yn_access_key,
        })

        console.log('qrDetailEntity: ', qrDetailEntity);

        return await this.save(qrDetailEntity)
    }
}