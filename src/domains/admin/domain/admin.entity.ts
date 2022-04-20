import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('tb_admin')
@Unique(['email'])
export class AdminEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { comment: '유저 아이디' })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @Column('varchar', { comment: '유저 비밀번호' })
    @IsString()
    @IsNotEmpty()
    password: string;

    @Column('varchar', { comment: '담당자' })
    @IsString()
    manager: string;

    @Column('varchar', { comment: '유저 전화번호' })
    @IsString()
    @IsNotEmpty()
    phone: string;

    @Column('varchar', { comment: '유저 이메일' })
    @IsString()
    @IsNotEmpty()
    email: string;
}