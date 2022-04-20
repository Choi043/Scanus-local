import { IsNotEmpty, IsString } from "class-validator";

export class AdminSignUpDto {
    @IsString()
    @IsNotEmpty({ message: '아이디를 입력해주세요.'})
    userId: string;
    
    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.'})
    password: string;
    
    @IsString()
    @IsNotEmpty({ message: '담당자를 입력해주세요.'})
    manager: string;
    
    @IsString()
    @IsNotEmpty({ message: '전화번호를 입력해주세요.'})
    phone: string;
    
    @IsString()
    @IsNotEmpty({ message: '이메일을 입력해주세요.'})
    email: string;
}