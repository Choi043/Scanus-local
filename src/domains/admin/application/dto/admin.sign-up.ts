import { IsNotEmpty, IsString } from "class-validator";
import { AdminRoleType } from "../../domain/admin.role";

export class AdminSignUpDto {
    @IsString()
    @IsNotEmpty({ message: '아이디를 입력해주세요.'})
    admin_id: string;
    
    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    admin_pw: string;
    
    @IsString()
    @IsNotEmpty({ message: '담당자를 입력해주세요.'})
    mn_nm: string;
    
    @IsString()
    @IsNotEmpty({ message: '전화번호를 입력해주세요.'})
    mn_tel: string;
    
    @IsString()
    @IsNotEmpty({ message: '이메일을 입력해주세요.'})
    mn_email: string;

    @IsString()
    @IsNotEmpty({ message: '관리자 타입을 입력해주세요.'})
    admin_type: AdminRoleType;
}