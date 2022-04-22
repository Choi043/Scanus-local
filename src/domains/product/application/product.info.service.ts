import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "../domain/product.repository";

@Injectable()
export class ProductInfoService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly ProductRepository: ProductRepository
    ) {}
    
    async getProductInfo(product_idx: number) {
        const productFind = await this.ProductRepository.findOne({
            where: { pro_idx: product_idx },
        })

        if (!productFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }
        return productFind;
    }
}