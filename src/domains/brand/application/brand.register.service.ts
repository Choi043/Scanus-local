import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandRepository } from "../domain/brand.repository";
import { BrandRegisterDto } from "./dto/brand.register";

@Injectable()
export class BrandRegisterService {
    constructor(
        @InjectRepository(BrandRepository)
        private readonly brandRepository: BrandRepository
    ) {}
    
    async register(brandRegisterDto: BrandRegisterDto): Promise<BrandRegisterDto | undefined> {
        return await this.brandRepository.addBrand(brandRegisterDto);
    }
}