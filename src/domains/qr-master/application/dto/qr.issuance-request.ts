import { IsNotEmpty } from "class-validator";
import { Blockchain_yn } from "src/commons/enumLIst/bloackchain_yn";
import { Pro_cnnc_yn } from "src/commons/enumLIst/pro_cnnc_yn";
import { Scratch_type } from "src/commons/enumLIst/scratch_type";
import { Secure_type } from "src/commons/enumLIst/secure_type";
import { Sn_yn } from "src/commons/enumLIst/sn_yn";
import { Surl_yn } from "src/commons/enumLIst/surl_yn";
import { Unit_yn } from "src/commons/enumLIst/unit_yn";
import { Use_yn } from "src/commons/enumLIst/use_yn";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { ProductEntity } from "src/domains/product/domain/product.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";

export class QRIssuanceRequestDto {
    @IsNotEmpty()
    companyEntity: CompanyEntity;
    
    @IsNotEmpty()
    projectEntity: ProjectEntity;
    
    @IsNotEmpty()
    productEntity: ProductEntity;
    
    @IsNotEmpty()
    qy: number;

    @IsNotEmpty()
    sn_yn: Sn_yn;
    
    @IsNotEmpty()
    unit_yn: Unit_yn;
    
    @IsNotEmpty()
    pro_cnnc_yn: Pro_cnnc_yn;
    
    @IsNotEmpty()
    secure_type: Secure_type;
    
    @IsNotEmpty()
    scratch_type: Scratch_type;
    
    @IsNotEmpty()
    surl_yn: Surl_yn;
    
    @IsNotEmpty()
    blockchain_yn: Blockchain_yn;

    @IsNotEmpty()
    use_yn: Use_yn;
    
    qr_img_path: string;
    
    qr_state : string;
    
    recrt_nm: string;
    
    recrt_tel: string;
    
    dely_nm: string;
    
    dely_num: string;
}