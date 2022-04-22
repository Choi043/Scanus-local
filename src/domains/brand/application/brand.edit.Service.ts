import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BrandEntity } from "../domain/brand.entity";
import { BrandRepository } from "../domain/brand.repository";
import { BrandEditDto } from "./dto/brand.edit";

@Injectable()
export class BrandEditService {
    constructor(
        @InjectRepository(BrandRepository)
        private readonly brandRepository: BrandRepository
    ) {}

    async editBrand(brand_idx: number, editBrand: BrandEditDto): Promise<BrandEntity> {
        const brandFind = await this.brandRepository.findOne(brand_idx);

        brandFind.brand_nm = editBrand.brand_nm;
        brandFind.brand_img = editBrand.brand_img;
        brandFind.use_yn = editBrand.use_yn;

        await this.brandRepository.save(brandFind)

        return brandFind;
    }
}