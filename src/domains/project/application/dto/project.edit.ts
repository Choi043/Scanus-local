import { IsOptional } from "class-validator";
import { Blockchain_yn } from "src/commons/enumLIst/bloackchain_yn";
import { Pro_cnnc_yn } from "src/commons/enumLIst/pro_cnnc_yn";
import { Scratch_type } from "src/commons/enumLIst/scratch_type";
import { Secure_type } from "src/commons/enumLIst/secure_type";
import { Sn_yn } from "src/commons/enumLIst/sn_yn";
import { Surl_yn } from "src/commons/enumLIst/surl_yn";
import { Unit_yn } from "src/commons/enumLIst/unit_yn";
import { CompanyEntity } from "src/domains/company/domain/company.entity";

export class ProjectEditDto {
    @IsOptional()
    cmpny_nm: CompanyEntity
    
    @IsOptional()
    prjct_nm: string;

    @IsOptional()
    sn_yn: Sn_yn
    
    @IsOptional()
    unit_yn: Unit_yn
    
    @IsOptional()
    pro_cnnc_yn: Pro_cnnc_yn
    
    @IsOptional()
    secure_type: Secure_type
    
    @IsOptional()
    scratch_type: Scratch_type
    
    @IsOptional()
    surl_yn: Surl_yn

    @IsOptional()
    blockchain_yn: Blockchain_yn
}