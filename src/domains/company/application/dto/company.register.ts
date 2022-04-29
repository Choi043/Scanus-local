import { IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CompanyRegisterDto {    
    @IsNotEmpty({ message: '회사명을 입력해주세요.'})
    @MinLength(2, { message : '회사 이름은 두 글자 이상 입력해주세요.'})
    cmpny_nm: string;

    @MaxLength(3, { message: '회사코드는 세 자리까지 입력이 가능합니다.'})
    @IsNotEmpty({ message: '회사코드(세 자리)를 입력해주세요.'})
    @Matches(/^[a-zA-Z]*$/, {
        message: '적절한 형태의 회사 코드가 아닙니다.'
    })
    cmpny_cd: string;
}