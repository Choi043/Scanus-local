import { IsNotEmpty, IsString } from "class-validator";

export class AdminSignInDto {
    @IsString()
    @IsNotEmpty({ message: '아이디를 입력해주세요.'})
    userId: string;

    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    password: string;

    role?: any;
}