import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { AdminType } from "../../domain/admin.role";
import { ConState } from "../../domain/admin.state";

export class AdminSignUpDto {
    @IsOptional()
    cmpny_idx?: CompanyEntity
    
    @IsString()
    @IsNotEmpty({ message: '아이디를 입력해주세요.'})
    admin_id: string;
    
    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    admin_pw: string;
    
    @IsString()
    @IsOptional()
    mn_nm: string;
    
    @IsString()
    @IsOptional()
    mn_tel: string;
    
    @IsString()
    @IsOptional()
    mn_email: string;

    @IsString()
    @IsOptional()
    // @IsNotEmpty({ message: '관리자 타입을 입력해주세요.'})
    admin_type?: AdminType;

    con_state: ConState;
    
    @IsOptional()
    con_text: string;

    @IsOptional()
    pw_count: number; 
}