import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('tb_company_project')
export class CompanyProjectEntity {
    @PrimaryColumn({ unsigned: true, comment: "회사IDX" })
    // @OneToMany(
    //     () => CompanyEntity,
    //     (companyEntity) => companyEntity.company_project
    // )
    // @JoinColumn({ name: 'cmpny_idx'})
    cmpny_idx: number;

    @PrimaryColumn({ unsigned: true, comment: "프로젝트IDX" })
    // @OneToMany(
    //     () => ProjectEntity,        
    //     (projectEntity) => projectEntity.company_project
    //     )
    // @JoinColumn({ name: 'prjct_idx'})
    prjct_idx: number;

    @Column('int', { nullable: true, comment: '등록IDX' })
    reg_idx: number;

    @Column('datetime', { default: () => 'current_timestamp', comment: '등록일시' })
    reg_dt: Date;
}