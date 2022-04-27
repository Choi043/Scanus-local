import { Column, UpdateDateColumn } from "typeorm";

export abstract class DateEntity {
    @Column('datetime', { default: () => 'current_timestamp',  comment: '등록일시' })
    reg_dt: Date;
    
    @UpdateDateColumn({ nullable: true, comment: '수정일시' })
    mod_dt: Date;
}