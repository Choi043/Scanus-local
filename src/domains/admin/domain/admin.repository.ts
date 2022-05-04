import { EntityRepository, Repository } from "typeorm";
import { AdminSignUpDto } from "../application/dto/admin.sign-up";
import { AdminEntity } from "./admin.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {

    async createAdmin(adminSignUpDto: AdminSignUpDto): Promise<AdminEntity> {
        const { admin_id, cmpny_idx, admin_pw, mn_nm, mn_tel, mn_email, admin_type } = adminSignUpDto
        console.log('companyEntity: ', cmpny_idx);

        const salt = await bcrypt.genSalt()     // salt 생성 메서드, 바이트 단위의 임의의 문자열
        const hashedPassword = await bcrypt.hash(admin_pw, salt);   // admin_pw와 salt를 인자로 받아 암호화된 비밀번호 hashedPassword 생성

        const adminAccount: AdminEntity = this.create({     // adminAccount:AdminEntity 인스턴스 생성, 각 값에 객체 리터럴 허용
            admin_id,
            companyEntity: cmpny_idx,
            admin_pw: hashedPassword,   // adminAccount.admin_pw = adminSignUpDto.admin_pw 형식을 그대로 받지 않고 hash된 pw 할당
            mn_nm,
            mn_tel,
            mn_email,
            admin_type,
        });

        return await this.save(adminAccount);   // DB에 adminaAccount 저장
    }
}