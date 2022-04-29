import { Use_yn } from "src/commons/enumLIst/use_yn";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { BrandEntity } from "src/domains/brand/domain/brand.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_product')
export class ProductEntity extends DateIdxEntity{
    @PrimaryGeneratedColumn({ unsigned: true, comment: "제품IDX" })
    pro_idx: number;

    @Column('varchar', { length: 100, nullable: true, comment: '상품코드' })
    pro_code: string;

    @Column('varchar', { length:100, nullable: true, comment: '상품URL' })
    pro_url: string;

    @Column('varchar', { length:250, comment: '상품이미지' })
    pro_img: string;

    @Column('varchar', { length:150, comment: '상품명' })
    pro_nm: string;

    @Column('varchar', { length:250, nullable: true, comment: '상품요약' })
    pro_sumry: string;

    @Column('text', { nullable: true, comment: '상품설명' })
    pro_info: string;

    @Column({
        type: 'enum',
        enum: Use_yn,
        default: Use_yn.USE_DEFAULT,
        comment: '_사용유무 (Y:사용, N:미사용)'
    })
    use_yn: Use_yn
    
    @ManyToOne(() => CompanyEntity)
    @JoinColumn({ name: 'cmpny_idx'})
    companyEntity: CompanyEntity    

    @ManyToOne(() => BrandEntity)
    @JoinColumn({ name: 'brand_idx' })
    brandEntity: BrandEntity
}