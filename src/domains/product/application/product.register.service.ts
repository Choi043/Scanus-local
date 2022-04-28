import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProductRepository } from "../domain/product.repository";
import { ProductRegisterDto } from "./dto/product.register";

@Injectable()
export class ProductRegisterService {
    constructor(
        @InjectRepository(ProductRepository)
        private readonly productRepository: ProductRepository
    ) {}
    
    async register(productRegisterDto: ProductRegisterDto): Promise<ProductRegisterDto> {
        return await this.productRepository.addProduct(productRegisterDto);
    }
}