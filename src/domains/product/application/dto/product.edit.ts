import { IsOptional } from "class-validator";
import { Use_yn } from "src/commons/enumLIst/use_yn";

export class ProductEditDto {
    @IsOptional()
    pro_code?: string;

    @IsOptional()
    pro_url?: string;

    @IsOptional()
    pro_img?: string;

    @IsOptional()
    pro_nm?: string;

    @IsOptional()
    pro_sumry?: string;

    @IsOptional()
    pro_info?: string;

    @IsOptional()
    use_yn?: Use_yn

}