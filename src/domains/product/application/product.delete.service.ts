import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "../domain/product.repository";

@Injectable()
export class ProductDeleteService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}

    async deleteProduct(product_idx: number) {
        const findProduct = await this.productRepository.findOne(product_idx)

        if (findProduct){
            await this.productRepository.delete(product_idx)
            return {
                message: "삭제 완료"
            }
        }

        return {
            message: "입력한 값이 존재하지 않습니다."
        }
    }
}