import { IsNotEmpty, IsString } from "class-validator";
import { AdminRoleType } from "../../domain/admin.role";

export class AdminSignInDto {
    @IsString()
    @IsNotEmpty({ message: '아이디를 입력해주세요.'})
    admin_id: string;

    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    admin_pw: string;

    admin_type?: AdminRoleType;
}