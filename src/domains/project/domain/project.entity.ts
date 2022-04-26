import { Blockchain_yn } from "src/commons/enumLIst/bloackchain_yn";
import { Pro_cnnc_yn } from "src/commons/enumLIst/pro_cnnc_yn";
import { Scratch_type } from "src/commons/enumLIst/scratch_type";
import { Secure_type } from "src/commons/enumLIst/secure_type";
import { Sn_yn } from "src/commons/enumLIst/sn_yn";
import { Surl_yn } from "src/commons/enumLIst/surl_yn";
import { Unit_yn } from "src/commons/enumLIst/unit_yn";
import { Use_yn } from "src/commons/enumLIst/use_yn";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_project')
export class ProjectEntity extends DateIdxEntity{
    @PrimaryGeneratedColumn()
    @OneToOne(
        () => CompanyProjectEntity,
        (cmpnyPrjctEntity) => cmpnyPrjctEntity.prjct_idx,
        )
    prjct_idx: number;

    @Column()
    prjct_nm: string;

    @Column({
        type: 'enum',
        enum: Sn_yn,
        name: 'sn_yn',
        default: Sn_yn.Type_0,
        comment: '_일련번호 (0:모두가능, Y:출력,N:출력안함)'
    })
    sn_yn: Sn_yn
    
    @Column({
        type: 'enum',
        enum: Unit_yn,
        name: 'unit_yn',
        default: Unit_yn.Type_0,
        comment: 'X_포장박스QR (0:모두가능,Y:생성, N:미생성)'
    })
    unit_yn: Unit_yn
    
    @Column({
        type: 'enum',
        enum: Pro_cnnc_yn,
        name: 'pro_cnnc_yn',
        default: Pro_cnnc_yn.Type_0,
        comment: 'X_상품정보 연결여부 (0:모두가능, Y:사용, N:미사용)'
    })
    pro_cnnc_yn: Pro_cnnc_yn
    
    @Column({
        type: 'enum',
        enum: Secure_type,
        name: 'secure_type',
        default: Secure_type.Type_0,
        comment: '_난수 (0:모두가능, 1:숫자 (6자리), 3:숫자 (3자리), 3:영문대문자 +숫자(8자리))'
    })
    secure_type: Secure_type
    
    @Column({
        type: 'enum',
        enum: Scratch_type,
        name: 'scratch_type',
        default: Scratch_type.Type_0,
        comment: '_스크래치 (0:모두가능, Y:사용, N:미사용)'
    })
    scratch_type: Scratch_type
    
    @Column({
        type: 'enum',
        enum: Surl_yn,
        name: 'surl_yn',
        default: Surl_yn.Type_0,
        comment: '_단축URL사용여부 (0:모두가능, Y:사용, N:미사용)'
    })
    surl_yn: Surl_yn
    
    @Column({
        type: 'enum',
        enum: Blockchain_yn,
        name: 'blockchain_yn',
        default: Blockchain_yn.Type_0,
        comment: '_블록체인 사용여부(0:모두가능, Y:사용, N:미사용)'
    })
    blockchain_yn: Blockchain_yn
    
    @Column({
        type: 'enum',
        enum: Use_yn,
        name: 'use_yn',
        default: Use_yn.USE_DEFAULT,
        comment: '_사용유무 (Y:사용, N:미사용)'
    })
    use_yn: Use_yn
    
    // @ManyToOne(() => CompanyEntity)
    // @JoinColumn({ name: 'cmpny_idx'})
    // companyEntity: CompanyEntity
    
    // @OneToOne(() => CompanyProjectEntity)
    // @JoinColumn()
    // company_project: CompanyProjectEntity;
}