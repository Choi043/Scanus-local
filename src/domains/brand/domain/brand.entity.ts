import { Use_yn } from "src/commons/enumLIst/use_yn";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_brand')
export class BrandEntity extends DateIdxEntity{
    @PrimaryGeneratedColumn()
    brand_idx: number;

    @Column('varchar', { comment: '브랜드명' })
    brand_nm: string;
    
    @Column('varchar', { 
        nullable: true,
        comment: '브랜드 이미지' 
    })
    brand_img: string;
    
    @Column({
        type: 'enum',
        enum: Use_yn,
        name: 'use_yn',
        default: Use_yn.USE_DEFAULT,
        comment: '_사용유무 (Y:사용, N:미사용)'
    })
    use_yn: Use_yn

    @ManyToOne(() => CompanyEntity)
    @JoinColumn({ name: 'cmpny_idx'})
    companyEntity: CompanyEntity

}