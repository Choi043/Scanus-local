import { IsNotEmpty } from "class-validator";

export class CompanyRegisterDto {    
    @IsNotEmpty({ message: '회사명을 입력해주세요.'})
    cmpny_nm: string;

    @IsNotEmpty({ message: '회사코드(3자리)를 입력해주세요.'})
    cmpny_cd: string;
}