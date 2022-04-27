import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity('tb_company_project')
export class CompanyProjectEntity  {    
    @PrimaryColumn({comment: "회사IDX"})
    @ManyToOne(() => CompanyEntity)
    @JoinColumn({ name: 'cmpny_idx'})
    cmpny_idx : CompanyEntity;

    @PrimaryColumn({comment: "프로젝트IDX"})
    @ManyToOne(() => ProjectEntity)
    @JoinColumn({ name: 'prjct_idx'})
    prjct_idx : ProjectEntity;
    
    @Column('varchar', { nullable: true, comment: '등록IDX' })
    reg_idx: number;

    @Column('varchar', { default: () => 'current_timestamp',  comment: '등록일시' })
    reg_dt: Date;
}