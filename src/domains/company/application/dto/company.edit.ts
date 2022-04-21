import { IsOptional, IsString, Matches, MinLength } from "class-validator";
import { Leave_fl } from "../../domain/company.leave";

export class CompanyEditDto {
    @IsString()
    @IsOptional()
    @MinLength(2)
    cmpny_nm?: string;
    
    @IsString()
    @IsOptional()
    @Matches(/^[A-Z]{3,3}$/ , {
        message: '영어 대문자 세 자리를 입력해주세요.'
    })
    cmpny_cd?: string;

    @IsOptional()
    leave_fl: Leave_fl
}