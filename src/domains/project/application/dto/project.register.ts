import { IsNotEmpty, IsString } from "class-validator";
import { Blockchain_yn } from "src/commons/enumLIst/bloackchain_yn";
import { Pro_cnnc_yn } from "src/commons/enumLIst/pro_cnnc_yn";
import { Scratch_type } from "src/commons/enumLIst/scratch_type";
import { Secure_type } from "src/commons/enumLIst/secure_type";
import { Sn_yn } from "src/commons/enumLIst/sn_yn";
import { Surl_yn } from "src/commons/enumLIst/surl_yn";
import { Unit_yn } from "src/commons/enumLIst/unit_yn";
import { Use_yn } from "src/commons/enumLIst/use_yn";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";

export class ProjectRegisterDto {
    company_project: CompanyProjectEntity
    
    @IsString()
    @IsNotEmpty({ message: '프로젝트 명을 입력해주세요.'})
    prjct_nm: string;
    
    sn_yn: Sn_yn
    
    scratch_type: Scratch_type
    
    secure_type: Secure_type
    
    unit_yn: Unit_yn
    
    surl_yn: Surl_yn
    
    blockchain_yn: Blockchain_yn
    
    pro_cnnc_yn: Pro_cnnc_yn
}