import { IsNotEmpty } from "class-validator";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Leave_fl } from "./company.leave";

@Entity('tb_company')
@Unique(['cmpny_cd'])
export class CompanyEntity extends DateIdxEntity {
    @PrimaryGeneratedColumn({ unsigned: true, comment: "회사IDX" })
    cmpny_idx: number;

    @Column('varchar', { length: 30, comment: '회사명' })
    @IsNotEmpty()
    cmpny_nm: string;

    @Column('varchar', { length: 3, comment: '회사코드(3자리)' })
    @IsNotEmpty()
    cmpny_cd: string;

    @Column({
        type: 'enum',
        enum: Leave_fl,
        default: Leave_fl.COMPANY_DEFAULT,
        comment: '탈퇴 여부'
    })
    leave_fl: Leave_fl

    // @OneToOne(
    //     () => CompanyProjectEntity,
    //     (companyProjectEntity) => companyProjectEntity.cmpny_idx,
    // )
    // company_project: Promise<CompanyProjectEntity>;

    @OneToMany(
        () => CompanyProjectEntity,
        (companyProjectEntity) => companyProjectEntity.cmpny_idx//, { createForeignKeyConstraints: false }
    )
    company_project: CompanyProjectEntity;
}