import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandRepository } from "../domain/brand.repository";

@Injectable()
export class BrandDeleteService {
    constructor(
        @InjectRepository(BrandRepository)
        private readonly brandRepository: BrandRepository
    ) {}

    async deleteBrand(brand_idx: number) {
        const findBrand = await this.brandRepository.findOne(brand_idx)

        if (findBrand){
            await this.brandRepository.delete(brand_idx)
            return {
                message: "삭제 완료"
            }
        }
        
        return {
            message: "입력한 값이 존재하지 않습니다."
        }
    }
}