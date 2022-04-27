import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class COPYEntity {
    @PrimaryGeneratedColumn({comment: " IDX"})
    id: number;

    @Column('varchar', { length: 100, nullable: true, comment: '' })
    userID: string;

    @Column()
    password: string;

    @Column()
    email: string;
}