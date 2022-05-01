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

    async list(options: PaginationOptions) {        // options Type : 갯수, 페이지 지정해서 출력할 커스텀 페이지네이션
        const { take, page } = options;         // take : 갯수, page : 참조할 페이지 수
        return await this.adminRepository
            .createQueryBuilder('tb_admin')     // 쿼리빌더 tb_admin 참조
            .select([                           // select 매니저 이름, 이메일, 등록 날짜
                'tb_admin.mn_nm',
                'tb_admin.mn_email',
                'tb_admin.reg_dt',
            ])
            .take(take)                         // 가져올 갯수
            .skip(take * (page - 1))            // 정렬된 데이터들을 입력 페이지 수만큼 skip하고 그 다음부터 조회
            .orderBy('tb_admin.admin_idx', 'DESC')      // admin_idx로 내림차순, 즉 최신순
            .getManyAndCount()                  // 실제 조회 결과 count
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