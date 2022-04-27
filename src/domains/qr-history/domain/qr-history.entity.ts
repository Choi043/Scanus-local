import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('tb_qr_history')
@Unique(['qr_key', 'result', 'session_id'])
export class QRHistoryEntity {
    @PrimaryGeneratedColumn({comment: "히스토리 IDX"})
    hit_idx: number;

    @Column('varchar', { length: 100, comment: 'QR Key' })
    qr_key: string;

    @Column('varchar', { length: 50, nullable: true, comment: '위도' })
    password: string;

    @Column('varchar', { length: 50, nullable: true, comment: '경도' })
    email: string;

    @Column('varchar', { length: 50, default: '1', comment: '상태 (1:스캔, 2:확인)' })
    result: string;

    @Column('varchar', { length: 100, nullable: true, comment: 'session_id' })
    session_id: string;

    @Column('int', { default: 1,comment: 'hit' })
    hit: number;

    @Column('varchar', { length: 250, nullable: true, comment: '타입' })
    type: string;

    @Column('datetime', { default: () => 'current_timestamp', nullable: true, comment: '등록일시' })
    reg_dt: Date;

    @Column('varchar', { length: 20, comment: '등록IP' })
    reg_ip: string;
}