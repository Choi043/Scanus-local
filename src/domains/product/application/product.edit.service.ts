import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "../domain/product.repository";
import { ProductEditDto } from "./dto/product.edit";

@Injectable()
export class ProductEditService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}
    
    async editProduct(product_idx:number, productEditDto: ProductEditDto) {
        const productFind = await this.productRepository.findOne(product_idx);

        productFind.pro_code = productEditDto.pro_code;
        productFind.pro_url = productEditDto.pro_url;
        productFind.pro_img = productEditDto.pro_img;
        productFind.pro_nm = productEditDto.pro_nm;
        productFind.pro_sumry = productEditDto.pro_sumry;
        productFind.pro_info = productEditDto.pro_info;
        productFind.use_yn = productEditDto.use_yn;

        await this.productRepository.save(productFind)

        return productFind;
    }
}