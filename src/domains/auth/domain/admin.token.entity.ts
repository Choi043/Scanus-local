import { AdminEntity } from "src/domains/admin/domain/admin.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_admin_token')
export class AdminTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar')
    token: string;

    @OneToOne(() => AdminEntity, (adminEntity) => adminEntity)
    adminEntity: AdminEntity;

    @Column()
    refreshToken: string;
}