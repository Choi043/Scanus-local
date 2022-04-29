import { BadRequestException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CompanyRegisterDto } from "../application/dto/company.register";
import { CompanyEntity } from "./company.entity";

@EntityRepository(CompanyEntity)
export class CompanyRepository extends Repository<CompanyEntity> {
    async addCompany(companyRegisterDto: CompanyRegisterDto): Promise<CompanyEntity> {
        try {
        const { cmpny_nm, cmpny_cd } = companyRegisterDto   // 입력된 DTO 형식에서 cmpny_nm, cmpny_cd 변수 할당
        
        // newCompany의 새 인스턴스 생성, 
        // 선택적으로 newCompany:Entity형식에 기록(저장)할 Entity속성(or dto)이 있는 객체 리터럴 허용
        const newCompany: CompanyEntity = this.create({     
            cmpny_nm,
            cmpny_cd: cmpny_cd.toUpperCase(),   // 소문자로 입력된 경우 대문자로 저장
        })
        
        return await this.save(newCompany);     // Repository.save로 주어진 엔터티가 DB에 있는 경우 업데이트, 없으면 삽입
        } catch(err) {
            if( err.code === 'ER_DUP_ENTRY') {  // 임시로 cmpny_cd로 중복키 에러 생성
                throw new BadRequestException('이미 등록된 기업 코드명을 입력하셨습니다.')
            }
        }
    }
}