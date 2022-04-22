import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "src/commons/jwt/jwt.payload";
import { PaginationOptions } from "src/commons/typeorm/paginate/pagination.option";
import { FindOneOptions } from "typeorm";
import { AdminEntity } from "../domain/admin.entity";
import { AdminRepository } from "../domain/admin.repository";
import { AdminInfoDto } from "./dto/admin.info";

@Injectable()
export class AdminInfoService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
    ) { }

    // 회사명, 회사코드, 담당자명, 아이디, 등록일
    async list(options: PaginationOptions) {
        const { take, page } = options;
        return await this.adminRepository
            .createQueryBuilder('tb_admin')
            .select([
                // 'tb_company.cmpny_nm'
                // 'tb_company.cmpny_cd'
                'tb_admin.mn_nm',
                'tb_admin.mn_email',
                'tb_admin.reg_dt',
            ])
            .take(take)
            .skip(take * (page - 1))
            // .innerJoin('tb_admin.admin_idx', 'tb_company')
            .orderBy('tb_admin.admin_idx', 'DESC')
            .getManyAndCount()
    }

    async getAdminInfo(admin_idx: number) {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_idx },
            // relations: ['']
        })

        if (!adminFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }

        return adminFind;
    }

    // 위치 지정을 잘 해야 함

    async findById(admin_id: string): Promise<AdminEntity> {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_id },
        });

        if (!adminFind) {
            throw new BadRequestException('존재하지 않는 사용자입니다.');
        }

        return adminFind;
    }

    async findByFields(options: FindOneOptions<AdminInfoDto>): Promise<AdminInfoDto | undefined> {
        return await this.adminRepository.findOne(options);
    }
}