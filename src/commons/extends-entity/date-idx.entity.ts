import { Column, UpdateDateColumn } from "typeorm";

export abstract class DateIdxEntity {
    @Column('int', { nullable: true, comment: '등록IDX' })
    reg_idx: number;

    @Column('datetime', { default: () => 'current_timestamp',  comment: '등록일시' })
    reg_dt: Date;

    @Column('int', { nullable: true, comment: '수정DIX' })
    mod_idx: number;
    
    @UpdateDateColumn({ nullable: true, comment: '수정일시' })
    mod_dt: Date;
}