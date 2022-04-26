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

    async list() {
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
}