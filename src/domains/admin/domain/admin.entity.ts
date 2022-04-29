import { IsNotEmpty, IsString } from "class-validator";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { AdminTokenEntity } from "src/domains/auth/domain/admin.token.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { AdminType } from "./admin.role";
import { ConState } from "./admin.state";

@Entity('tb_admin')
export class AdminEntity{
    @PrimaryGeneratedColumn({ unsigned: true, comment: "관리자IDX"})
    admin_idx: number;    

    @ManyToOne(() => CompanyEntity)
    @JoinColumn({ name: 'cmpny_idx'})
    companyEntity: CompanyEntity

    @Column('varchar', { length: 50, comment: '아이디' })
    @IsString()
    @IsNotEmpty()
    admin_id: string;

    @Column('varchar', { length: 60,  comment: '비밀번호' })
    @IsString()
    @IsNotEmpty()
    admin_pw: string;

    @Column('varchar', { length: 30,  nullable: true, comment: '담당자명' })
    @IsString()
    mn_nm: string;

    @Column('varchar', { length: 15,  nullable: true,  comment: '전화번호' })
    @IsString()
    mn_tel: string;

    @Column('varchar', { length: 50,  nullable: true,  comment: '이메일' })
    @IsString()
    mn_email: string;

    @Column({
        type: 'enum', 
        enum: AdminType, 
        default: AdminType.ADMIN,
        comment: '_관리자타입 (M:마스터, A:고객사 어드민)' 
    })
    @IsNotEmpty()
    admin_type: AdminType;
    
    @Column({
        type: 'enum', 
        enum: ConState, 
        default: ConState.TYPE_1,
        comment: '_관리자상태 (1:승인대기,2:활성화,3:반려,4:비활성화)' 
    })
    @IsNotEmpty()
    con_state: ConState;

    @Column('text', { nullable: true, comment: '반려사유'})
    con_text: string;

    @Column('int', { default:0, comment: '비밀번호 실패 카운트'})
    pw_count: number;    

    @Column('datetime', { default: () => 'current_timestamp', nullable: true, comment: '등록일시' })
    reg_dt: Date;

    @Column('int', { nullable: true, comment: '수정DIX' })
    mod_idx: number;
    
    @UpdateDateColumn({ nullable: true, comment: '수정일시' })
    mod_dt: Date;

    @OneToOne(
        () => AdminTokenEntity,
        (adminTokenEntity => adminTokenEntity.adminEntity),
    )
    adminTokenEntity: Promise<AdminTokenEntity>;
}