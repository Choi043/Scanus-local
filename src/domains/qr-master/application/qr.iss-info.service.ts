import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { QREntity } from "../domain/qr.entity";
import { QRRepository } from "../domain/qr.repository";

@Injectable()
export class QRIssInfoService {
    constructor(
        @InjectRepository(QRRepository)
        private readonly qrRepository: QRRepository
    ) { }

    async getQRInfo(qr_idx: number) {
        const findQR = await this.qrRepository.findOne({
            where: { qr_idx }
        })

        return findQR;
    }

    async getQrToProejct(prjct_idx: number) {

        return await this.qrRepository
            .createQueryBuilder('tb_qr')
            .select([
                'tb_qr.qr_idx',
                'tb_project.prjct_idx',
            ])
            .innerJoin('tb_qr.projectEntity', 'tb_project')
            .where(`tb_qr.prjct_idx = ${prjct_idx}`)
            .getManyAndCount()
    }

    // 회사명, 프로젝트명, 제품명, 회사코드, 일련번호, 스크래치, 난수, 포장박스, 상품정보, 단축URL, 블록체인 사용여부, 수량, 상태
    async infoChannel(condition: string, find: string) {
        const whereQuery = this.checkChannel(condition, find)
        console.log('whereQuery: ', whereQuery);

        return await this.qrRepository
            .createQueryBuilder('tb_qr')
            .select([
                'tb_company.cmpny_nm',
                'tb_company.cmpny_cd',
                'tb_project.prjct_nm',
                'tb_product.pro_nm',
                'tb_qr.sn_yn',
                'tb_qr.unit_yn',
                'tb_qr.pro_cnnc_yn',
                'tb_qr.secure_type',
                'tb_qr.surl_yn',
                'tb_qr.blockchain_yn',
                'tb_qr.use_yn',
                'tb_qr.qy',
                'tb_qr.qr_state',
                'tb_qr.reg_dt',
            ])
            .innerJoin('tb_qr.companyEntity', 'tb_company')
            .innerJoin('tb_qr.projectEntity', 'tb_project')
            .innerJoin('tb_qr.productEntity', 'tb_product')
            .where(whereQuery)
            .orderBy('tb_qr.reg_dt', 'ASC')
            .getManyAndCount()
    }
    

    public checkChannel(condition: string, find: string) {
        let query: string;
        if (condition === 'cmpny_nm' || condition === 'cmpny_cd') {
            query = `tb_company.${condition} LIKE "${find}%"`;
        }
        else if (condition === 'prjct_nm') {
            query = `tb_project.${condition} LIKE "${find}%"`;
        }
        else if (condition === 'reg_dt') {
            query = `tb_qr.${condition} LIKE "${find}%"`;
        } else if (condition === 'qr_idx') {
            return;
        }
        else {
            throw new BadRequestException("잘못된 값을 입력하셨습니다.")
        }
        return query
    }
}