import { Use_yn } from "src/commons/enumLIst/use_yn";
import { CompanyEntity } from "src/domains/company/domain/company.entity";

export class BrandRegisterDto {
    brand_nm: string;    
    brand_img: string;    
    use_yn: Use_yn;

    companyEntity: CompanyEntity;
}