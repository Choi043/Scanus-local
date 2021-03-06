import { IsOptional } from "class-validator";
import { Use_yn } from "src/commons/enumLIst/use_yn";
import { CompanyEntity } from "src/domains/company/domain/company.entity";

export class ProductRegisterDto {
    @IsOptional()
    pro_code?: string;
    
    @IsOptional()
    pro_url?: string;
    
    pro_img: string;
    pro_nm: string;
    pro_sumry: string;
    pro_info: string;
    
    @IsOptional()
    use_yn?: Use_yn

    companyEntity: CompanyEntity;

}