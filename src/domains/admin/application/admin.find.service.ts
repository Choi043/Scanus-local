import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { AdminEntity } from "../domain/admin.entity";
import { AdminRepository } from "../domain/admin.repository";
import { AdminInfoDto } from "./dto/admin.info";

@Injectable()
export class AdminFindService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository
    ) { }

    async findById(admin_id: string): Promise<AdminEntity> {
        const adminFind = await this.adminRepository.findOne({      // Repository.findOne 함수() - 주어진 값(entity)에 일치하는 첫 번째 엔티티를 찾음
            where: { admin_id },        // -> where admin_id = admin_id(변수 값)
        });

        if (!adminFind) {               // adminFind에 해당하는 엔티티가 없어 undefined일 경우
            throw new BadRequestException('계정 정보가 존재하지 않습니다.');
        }

        return adminFind;
    }

    async findByIndex(admin_idx: number): Promise<AdminEntity> {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_idx },       // where admin_idx = 매개변수 admin_idx(변수 값: pk값으로 참조)
        });

        if (!adminFind) {               // adminFind에 해당하는 엔티티가 없어 undefined일 경우
            throw new BadRequestException('계정 정보가 존재하지 않습니다.');
        }

        if (adminFind.pw_count >= 5) {  // adminFind에 pw_count가 5회 이상 비밀번호를 틀렸을 시
            throw new BadRequestException('비밀번호 입력 시도 횟수를 넘었습니다. 관리자에게 문의바랍니다.');
        }

        return adminFind;
    }

    async findByFields(options: FindOneOptions<AdminEntity>): Promise<AdminEntity> {        // id, index가 아닌 다른 값으로 entity를 찾으려 할 때,
        const fieldFind = await this.adminRepository.findOne(options);

        if (!fieldFind) {
            throw new BadRequestException(`${options} 정보가 존재하지 않습니다.`)
        }
        return fieldFind;
    }
}