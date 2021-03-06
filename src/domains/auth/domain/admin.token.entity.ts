import { AdminEntity } from "src/domains/admin/domain/admin.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_admin_token')
export class AdminTokenEntity {
    @PrimaryGeneratedColumn({ unsigned: true, comment: '토큰 IDX'})
    id: number;

    @OneToOne(() => AdminEntity, (adminEntity) => adminEntity)
    @JoinColumn({ name: 'admin_idx' })
    adminEntity: AdminEntity;

    @Column()
    refreshToken: string;
}