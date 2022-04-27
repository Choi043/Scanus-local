import { IsNotEmpty } from "class-validator";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Leave_fl } from "./company.leave";

@Entity('tb_company')
export class CompanyEntity extends DateIdxEntity {
    @PrimaryGeneratedColumn({comment: "회사IDX"})
    cmpny_idx: number;

    @Column('varchar', { comment: '회사명' })
    @IsNotEmpty()
    cmpny_nm: string;

    @Column('varchar', { comment: '회사코드(3자리)' })
    @IsNotEmpty()
    cmpny_cd: string;
    
    @Column({
        type: 'enum',
        enum: Leave_fl,
        name: 'leave_fl',
        default: Leave_fl.COMPANY_DEFAULT,
        comment: '탈퇴 여부'
    })
    leave_fl: Leave_fl

    // @OneToOne(
    //     () => CompanyProjectEntity,
    //     (companyProjectEntity) => companyProjectEntity.cmpny_idx,
    // )
    // company_project: Promise<CompanyProjectEntity>;
}