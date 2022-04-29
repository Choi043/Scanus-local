import { IsOptional } from "class-validator";
import { Blockchain_yn_QR } from "src/commons/enumLIst/bloackchain_yn";
import { Pro_cnnc_yn_QR } from "src/commons/enumLIst/pro_cnnc_yn";
import { Scratch_type_QR } from "src/commons/enumLIst/scratch_type";
import { Secure_type_QR } from "src/commons/enumLIst/secure_type";
import { Sn_yn_QR } from "src/commons/enumLIst/sn_yn";
import { Surl_yn_QR } from "src/commons/enumLIst/surl_yn";
import { Unit_yn_QR } from "src/commons/enumLIst/unit_yn";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { Del_yn } from "../../domain/qr.delete";

export class QRReqestStateDto {
    @IsOptional()
    code?: CompanyEntity;

    @IsOptional()
    sn_yn?: Sn_yn_QR;
    
    @IsOptional()
    unit_yn?: Unit_yn_QR;
    
    @IsOptional()
    pro_cnnc_yn?: Pro_cnnc_yn_QR;
    
    @IsOptional()
    secure_type?: Secure_type_QR;
    
    @IsOptional()
    scratch_type?: Scratch_type_QR;
    
    @IsOptional()
    surl_yn?: Surl_yn_QR;
    
    @IsOptional()
    blockchain_yn?: Blockchain_yn_QR;
    
    @IsOptional()
    qy?: number;

    @IsOptional()
    del_yn?: Del_yn;
}