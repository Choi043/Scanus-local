import { IsNotEmpty, IsOptional } from "class-validator";
import { Scratch_type } from "src/commons/enumLIst/scratch_type";
import { AccessKey_upload } from "../../domain/accesskey.upload";
import { QR_upload } from "../../domain/qr-detail.upload";

export class QRDetailRegisterDto {
    @IsNotEmpty()
    qr_idx: number;
    
    @IsNotEmpty()
    cmpny_cd: string;
    
    @IsOptional()
    unique_cd: string;
    
    @IsOptional()
    unit: string;
    
    @IsOptional()
    furl: string;
    
    @IsOptional()
    surl: string;
    
    // @IsNotEmpty()
    @IsOptional()
    access_key?: string;
    
    @IsNotEmpty()
    scratch_type: Scratch_type
    
    @IsOptional()
    secure_cd: string;
    
    upload_yn?: QR_upload

    @IsOptional()
    upload_dt: Date;
    
    upload_yn_access_key?: AccessKey_upload
    
    @IsOptional()
    upload_dt_access_key: Date;
    
    @IsOptional()
    po_full_addr: string;
    
    @IsOptional()
    reg_dt: Date;
}