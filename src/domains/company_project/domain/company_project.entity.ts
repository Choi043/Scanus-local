import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('tb_company_project')
export class CompanyProjectEntity  {    
    @PrimaryColumn()
    cmpny_idx : number;

    @PrimaryColumn()
    prjct_idx : number;
    
    @Column('varchar', { nullable: true, comment: '등록IDX' })
    reg_idx: number;

    @Column('varchar', { default: () => 'current_timestamp',  comment: '등록일시' })
    reg_dt: Date;
}