import { IsNotEmpty } from "class-validator";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tb_company')
export class CompanyEntity extends DateIdxEntity {
    @PrimaryGeneratedColumn()
    cmpny_idx: number;

    @Column('varchar', { comment: '회사명' })
    @IsNotEmpty()
    cmpny_nm: string;

    @Column('varchar', { comment: '회사코드(3자리)' })
    @IsNotEmpty()
    cmpny_cd: string;
    
}