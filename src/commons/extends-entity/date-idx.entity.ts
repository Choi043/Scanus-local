import { Column } from "typeorm";

export abstract class DateIdxEntity {
    @Column('varchar', { nullable: true, comment: '등록IDX' })
    reg_idx: number;

    @Column('datetime', { default: () => 'current_timestamp',  comment: '등록일시' })
    reg_dt: Date;

    @Column('varchar', { nullable: true, comment: '수정DIX' })
    mod_idx: number;
    
    @Column('datetime', { nullable: true, comment: '수정일시' })
    mod_dt: Date;
}