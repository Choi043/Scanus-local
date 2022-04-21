import { EntityRepository, Repository } from "typeorm";
import { BrandRegisterDto } from "../application/dto/brand.register";
import { BrandEntity } from "./brand.entity";

@EntityRepository(BrandEntity)
export class BrandRepository extends Repository<BrandEntity> {
    
    async addBrand(brandRegisterDto: BrandRegisterDto): Promise<BrandEntity> {
        const { companyEntity, brand_nm, brand_img, use_yn } = brandRegisterDto

        const newBrand: BrandEntity = this.create({
            companyEntity,
            brand_nm, 
            brand_img, 
            use_yn
        })

        return await this.save(newBrand);
    }
}