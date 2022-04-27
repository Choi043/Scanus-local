import { IsNotEmpty, IsString } from "class-validator";
import { DateIdxEntity } from "src/commons/extends-entity/date-idx.entity";
import { AdminTokenEntity } from "src/domains/auth/domain/admin.token.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { AdminRoleType } from "./admin.role";

@Entity('tb_admin')
@Unique(['mn_email'])
export class AdminEntity extends DateIdxEntity{
    @PrimaryGeneratedColumn({comment: "관리자IDX"})
    admin_idx: number;

    @Column('varchar', { comment: '아이디' })
    @IsString()
    @IsNotEmpty()
    admin_id: string;

    @Column('varchar', { comment: '비밀번호' })
    @IsString()
    @IsNotEmpty()
    admin_pw: string;

    @Column('varchar', { comment: '담당자명' })
    @IsString()
    mn_nm: string;

    @Column('varchar', { comment: '전화번호' })
    @IsString()
    @IsNotEmpty()
    mn_tel: string;

    @Column('varchar', { comment: '이메일' })
    @IsString()
    @IsNotEmpty()
    mn_email: string;

    @Column('enum', { 
        enum: AdminRoleType, 
        comment: '_관리자 타입' 
    })
    @IsString()
    @IsNotEmpty()
    admin_type: AdminRoleType;

    @ManyToOne(() => CompanyEntity)
    @JoinColumn({ name: 'cmpny_idx'})
    companyEntity: CompanyEntity

    @OneToOne(
        () => AdminTokenEntity,
        (adminTokenEntity => adminTokenEntity.adminEntity),
    )
    adminTokenEntity: Promise<AdminTokenEntity>;
}