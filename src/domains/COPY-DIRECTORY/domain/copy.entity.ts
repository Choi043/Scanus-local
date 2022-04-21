import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class COPYEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userID: string;

    @Column()
    password: string;

    @Column()
    email: string;
}