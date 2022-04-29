import { IsNotEmpty } from "class-validator";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";

export class CompanyProjectInfoDto {
    @IsNotEmpty()
    cmpny_idx: number;

    @IsNotEmpty()
    prjct_idx: number;
}