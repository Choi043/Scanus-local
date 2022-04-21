import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandRepository } from "../domain/brand.repository";

@Injectable()
export class BrandInfoService {
    constructor(
        @InjectRepository(BrandRepository)
        private readonly brandRepository: BrandRepository
    ) {}

    async getBrandInfo(brand_idx: number) {
        const brandFind = await this.brandRepository.findOne({
            where: { brand_idx },
        })

        if (!brandFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }

        return brandFind;
    }

}