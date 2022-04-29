import { IsString } from "class-validator";

export class AdminInfoDto {    
    @IsString()
    admin_id: string;
    
    @IsString()
    admin_pw: string;
    
    @IsString()
    mn_nm: string;
    
    @IsString()
    mn_tel: string;
    
    @IsString()
    mn_email: string;

    @IsString()
    admin_type: string;
}