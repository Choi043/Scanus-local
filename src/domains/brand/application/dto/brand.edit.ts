import { IsOptional } from "class-validator";
import { Use_yn } from "src/commons/enumLIst/use_yn";

export class BrandEditDto {
    @IsOptional()
    brand_nm?: string;
    
    @IsOptional()
    brand_img?: string;
    
    @IsOptional()
    use_yn?: Use_yn
}