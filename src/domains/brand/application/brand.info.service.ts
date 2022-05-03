import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationOptions } from "src/commons/typeorm/paginate/pagination.option";
import { BrandRepository } from "../domain/brand.repository";

@Injectable()
export class BrandInfoService {
    constructor(
        @InjectRepository(BrandRepository)
        private readonly brandRepository: BrandRepository
    ) { }

    async getBrandInfo(brand_idx: number) {
        const brandFind = await this.brandRepository.findOne({
            where: { brand_idx },
        })

        if (!brandFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }
        return brandFind;
    }

    // 회사명, 회사코드, 담당자명, 아이디, 등록일
    async infoChannel(condition: string, find: string) {
        const whereQuery = this.checkChannel(condition, find);
        return await this.brandRepository
            .createQueryBuilder('tb_brand')
            .select([
                'tb_company.cmpny_nm',      // cmpny_idx 참조하여 tb_company.cmpny_nm 값 select
                'tb_brand.brand_nm',
                'tb_brand.brand_img',
                'tb_brand.use_yn',
                'tb_brand.reg_dt',
            ])
            .innerJoin('tb_brand.companyEntity', 'tb_company')  // AdminEntity에서 조인 관계 설정한 companyEntity와 tb_company에 대해서 innerJoin
            .where(whereQuery)     // 파라미터로 받은 condition(조건 조회 키)와 find(조건 입력 값)로 결과 값 조정
            .orderBy('tb_brand.reg_dt', 'ASC')
            .getManyAndCount()
    }

    async allFindlist() {
        return await this.brandRepository
            .createQueryBuilder('tb_brand')
            .select([
                'tb_brand.brand_nm',
                'tb_brand.brand_img',
                'tb_brand.reg_dt',
            ])
            .where('tb_brand.reg_idx IS NULL')
            .orderBy('tb_brand.reg_dt', 'ASC')
            .getManyAndCount()
    }

    public checkChannel(condition: string, find: string) {
        let query: string;
        if (condition === 'cmpny_nm') {
            query = `tb_company.${condition} LIKE "%${find}%"`;
        } else if (condition === 'brand_nm') {
            query = `tb_brand.${condition} LIKE "%${find}%"`;
        } else if (condition === 'use_yn') {
            query = `tb_brand.${condition} LIKE "%${find}%"`;
        } else if (condition === 'reg_dt') {
            query = `tb_brand.${condition} LIKE "%${find}%"`;
        } else {
            throw new BadRequestException("잘못된 값을 입력하셨습니다.")
        }
        return query
    }
}