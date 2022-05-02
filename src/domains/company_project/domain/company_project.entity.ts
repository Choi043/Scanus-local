import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('tb_company_project')
export class CompanyProjectEntity {
    @PrimaryColumn({ unsigned: true, comment: "회사IDX" })
    @ManyToOne(
        () => CompanyEntity,
        (companyEntity) => companyEntity.cmpny_idx
    )
    @JoinColumn({ name: 'cmpny_idx'})
    cmpny_idx: number;

    @PrimaryColumn({ unsigned: true, comment: "프로젝트IDX" })
    @ManyToOne(
        () => ProjectEntity,        
        (projectEntity) => projectEntity.prjct_idx
        )
    @JoinColumn({ name: 'prjct_idx'})
    prjct_idx: number;

    @Column('int', { nullable: true, comment: '등록IDX' })
    reg_idx: number;

    @Column('datetime', { default: () => 'current_timestamp', comment: '등록일시' })
    reg_dt: Date;
}