import { Column } from "typeorm";

export abstract class DateEntity {
    @Column('varchar', { nullable: true, comment: '등록일시' })
    reg_dt: Date;
    
    @Column('varchar', { nullable: true, comment: '수정일시' })
    mod_dt: Date;
}