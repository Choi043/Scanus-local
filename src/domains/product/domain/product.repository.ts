import { EntityRepository, Repository } from "typeorm";
import { ProductRegisterDto } from "../application/dto/product.register";
import { ProductEntity } from "./product.entity";

@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {

    async addProduct(productRegisterDto: ProductRegisterDto): Promise<ProductEntity> {
        const { pro_code, pro_url, pro_img, pro_nm, pro_sumry, pro_info, use_yn } = productRegisterDto

        const newProduct: ProductEntity = this.create({
            pro_code, 
            pro_url, 
            pro_img, 
            pro_nm, 
            pro_sumry, 
            pro_info, 
            use_yn,
        })

        return await this.save(newProduct);
    }
}