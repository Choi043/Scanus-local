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

    async list(options: PaginationOptions) {
        const { take, page } = options;
        return await this.adminRepository
            .createQueryBuilder('tb_admin')
            .select([
                'tb_admin.mn_nm',
                'tb_admin.mn_email',
                'tb_admin.reg_dt',
            ])
            .take(take)
            .skip(take * (page - 1))
            .orderBy('tb_admin.admin_idx', 'DESC')
            .getManyAndCount()
    }

    // 회사명, 회사코드, 담당자명, 아이디, 등록일
    async infoChannel(condition: string, find: string) {
        
        return await this.adminRepository
            .createQueryBuilder('tb_admin')
            .select([
                'tb_company.cmpny_nm',
                'tb_company.cmpny_cd',
                'tb_admin.mn_nm',
                'tb_admin.mn_email',
                'tb_admin.reg_dt',
            ])
            .innerJoin('tb_admin.companyEntity', 'tb_company')
            .where(`tb_admin.${condition} LIKE "${find}%"`)
            .orderBy('tb_admin.reg_dt', 'ASC')
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
}