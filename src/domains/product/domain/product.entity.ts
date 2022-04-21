import { Use_yn } from "src/commons/enumLIst/use_yn";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_product')
export class ProductEntity extends DateIdxEntity{
    @PrimaryGeneratedColumn()
    pro_idx: number;

    @Column('varchar', { 
        nullable: true, 
        comment: '상품코드' 
    })
    pro_code: string;

    @Column('varchar', { 
        nullable: true, 
        comment: '상품URL' 
    })
    pro_url: string;

    @Column('varchar', { comment: '상품이미지' })
    pro_img: string;

    @Column('varchar', { comment: '상품명' })
    pro_nm: string;

    @Column('varchar', { comment: '상품요약' })
    pro_sumry: string;

    @Column('text', { comment: '상품설명' })
    pro_info: string;

    @Column({
        type: 'enum',
        enum: Use_yn,
        name: 'use_yn',
        default: Use_yn.USE_DEFAULT,
        comment: '_사용유무 (Y:사용, N:미사용)'
    })
    use_yn: Use_yn
}