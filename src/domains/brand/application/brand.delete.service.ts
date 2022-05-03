import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductInfoService } from "src/domains/product/application/product.info.service";
import { BrandRepository } from "../domain/brand.repository";

@Injectable()
export class BrandDeleteService {
    constructor(
        @InjectRepository(BrandRepository)
        private readonly brandRepository: BrandRepository,
        private readonly productInfoService: ProductInfoService,
    ) { }

    async deleteBrand(brand_idx: number) {
        const findBrand = await this.brandRepository.findOne(brand_idx)

        const findToBrand = await this.productInfoService.getProductInfo(0, brand_idx);
        const checkBrand = findToBrand[0];

        if (findBrand && !checkBrand) {
            await this.brandRepository.delete(brand_idx)
            return {
                message: "삭제 완료"
            }
        } else if (checkBrand) {
            return {
                message: "속해있는 제품이 있어서 삭제할 수 없습니다."
            }
        } else {
            return {
                message: "입력한 값이 존재하지 않습니다."
            }
        }
    }
}