import { Blockchain_yn_QR } from "src/commons/enumLIst/bloackchain_yn";
import { Pro_cnnc_yn_QR } from "src/commons/enumLIst/pro_cnnc_yn";
import { Scratch_type_QR } from "src/commons/enumLIst/scratch_type";
import { Secure_type_QR } from "src/commons/enumLIst/secure_type";
import { Sn_yn_QR } from "src/commons/enumLIst/sn_yn";
import { Surl_yn_QR } from "src/commons/enumLIst/surl_yn";
import { Unit_yn_QR } from "src/commons/enumLIst/unit_yn";
import { Use_yn } from "src/commons/enumLIst/use_yn";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { ProductEntity } from "src/domains/product/domain/product.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Del_yn } from "./qr.delete";

@Entity('tb_qr')
export class QREntity extends DateIdxEntity {
    @PrimaryGeneratedColumn({ unsigned: true, comment: "QR 마스터IDX" })
    qr_idx: number;

    @ManyToOne(() => CompanyEntity, { nullable:false })
    @JoinColumn({ name: 'cmpny_idx'})
    companyEntity: CompanyEntity

    @ManyToOne(() => ProjectEntity, { nullable:false })
    @JoinColumn({ name: 'prjct_idx'})
    projectEntity: ProjectEntity;
    
    @ManyToOne(() => ProductEntity, { nullable:false })
    @JoinColumn({ name: 'pro_idx'})
    productEntity: ProductEntity;

    @Column('int', { comment: '수량' })
    qy: number;

    @Column({
        type: 'enum',
        enum: Sn_yn_QR,
        comment: '_일련번호 (Y:출력,N:출력안함)'
    })
    sn_yn: Sn_yn_QR;
    
    @Column({
        type: 'enum',
        enum: Unit_yn_QR,
        comment: 'X_포장박스QR (Y:생성, N:미생성)'
    })
    unit_yn: Unit_yn_QR;
    
    @Column({
        type: 'enum',
        enum: Pro_cnnc_yn_QR,
        comment: 'X_상품정보 연결여부 (Y:사용, N:미사용)'
    })
    pro_cnnc_yn: Pro_cnnc_yn_QR;
    
    @Column({
        type: 'enum',
        enum: Secure_type_QR,
        comment: '_난수 (1:숫자 (6자리), 2:숫자 (3자리), 3:영문대문자 +숫자(8자리))'
    })
    secure_type: Secure_type_QR;
    
    @Column({
        type: 'enum',
        enum: Scratch_type_QR,
        comment: '_스크래치 (Y:사용, N:미사용)'
    })
    scratch_type: Scratch_type_QR;
    
    @Column({
        type: 'enum',
        enum: Surl_yn_QR,
        default: Surl_yn_QR.Type_N,
        comment: '_단축URL사용여부 (Y:사용, N:미사용)'
    })
    surl_yn: Surl_yn_QR;
    
    @Column({
        type: 'enum',
        enum: Blockchain_yn_QR,
        name: 'blockchain_yn',
        default: Blockchain_yn_QR.Type_N,
        comment: '_블록체인 사용여부(Y:사용, N:미사용)'
    })
    blockchain_yn: Blockchain_yn_QR;
    
    @Column({
        type: 'enum',
        enum: Use_yn,
        comment: '_사용유무 (Y:사용, N:미사용)'
    })
    use_yn: Use_yn;

    @Column('varchar', { length: 100, nullable: true, comment: 'QR 이미지 경로' })
    qr_img_path: string;

    @Column('char', { length: 1, comment: '_QR상태 (1:등록요청, 2: 등록중, 3:등록완료, 4:발송완료, 5:수령확인)' })
    qr_state : string;
    
    @Column('varchar', { length: 20, nullable: true, comment: '받는 사람' })
    recrt_nm: string;
    
    @Column('varchar', { length: 15, nullable: true, comment: '연락처' })
    recrt_tel: string;
    
    @Column('varchar', { length: 20, nullable: true, comment: '택배사' })
    dely_nm: string;
    
    @Column('varchar', { length: 20, nullable: true, comment: '송장 번호' })
    dely_num: string;    
    
    @Column({
        type: 'enum',
        enum: Del_yn,
        default: Del_yn.QR_DEFAULT,
        comment: '삭제여부'
    })
    del_yn: Del_yn;
}