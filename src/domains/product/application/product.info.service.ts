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

    async infoChannel(condition: string, find: string) {
        
        return await this.ProductRepository
            .createQueryBuilder('tb_product')
            .select([
                'tb_company.cmpny_nm',
                'tb_product.pro_code',
                'tb_product.pro_url',
                'tb_product.pro_img',
                'tb_product.pro_nm',
                'tb_product.pro_sumry',
                'tb_product.pro_info',
                'tb_product.use_yn',
                'tb_product.reg_dt',
            ])
            .innerJoin('tb_product.companyEntity', 'tb_company')
            .where(`tb_product.${condition} LIKE "${find}%"`)
            .orderBy('tb_product.reg_dt', 'ASC')
            .getManyAndCount()
    }
}