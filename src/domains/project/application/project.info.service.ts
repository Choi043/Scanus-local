import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectRepository } from "../domain/project.repository";

@Injectable()
export class ProjectInfoService {
    constructor(
        @InjectRepository(ProjectRepository)
        private readonly projectRepository: ProjectRepository
    ) { }
    
    async getProjectInfo(prjct_idx: number) {
        const projectFind = await this.projectRepository.findOne({
            where: { prjct_idx },
        })

        if (!projectFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }
        
        return projectFind;
    }

    async list() {        
        return await this.projectRepository
            .createQueryBuilder('tb_project')
            .select([
                'tb_project.prjct_idx',
                'tb_project.prjct_nm',
                'tb_project.sn_yn',
                'tb_project.unit_yn',
                'tb_project.pro_cnnc_yn',
                'tb_project.secure_type',
                'tb_project.scratch_type',
                'tb_project.surl_yn',
                'tb_project.blockchain_yn',
                'tb_project.reg_dt',
            ])
            .orderBy('tb_project.reg_dt', 'ASC')
            .getManyAndCount()
    }


    /**
     * 
     * @param condition 
     * 
     * prjct_idx 4 => cmpny name, prj_dt ,    tb_cmpny_prjct
     * 
     */

    
    // 회사명 - 프로젝트명 - 일련번호 ~ 블록체인사용여부 - 등록일
    async infoChannel(condition: string, find: string) {
        const whereQuery = this.checkChannel(condition, find)
        
        return await this.projectRepository
            .createQueryBuilder('tb_project')
            .select([
                'tb_company.cmpny_nm',
                'tb_company_project.cmpny_idx',
                // 'tb_company_project',
                'tb_project.prjct_nm',
                'tb_project.sn_yn',
                'tb_project.unit_yn',
                'tb_project.pro_cnnc_yn',
                'tb_project.secure_type',
                'tb_project.scratch_type',
                'tb_project.surl_yn',
                'tb_project.blockchain_yn',
                'tb_project.use_yn',
                'tb_project.reg_dt',
            ])
            .innerJoin('tb_project.company_project', 'tb_company_project')
            .innerJoin('tb_company_project.cmpny_idx', 'tb_company')
            .where(whereQuery)
            .orderBy('tb_project.reg_dt', 'ASC')
            .getManyAndCount()
    }

    public checkChannel(condition: string, find: string) {
        let query: string;
        if (condition === 'cmpny_nm') {
            query = `tb_company.${condition} LIKE "%${find}%"`;
        } else if (condition === 'prjct_nm') {
            query = `tb_project.${condition} LIKE "%${find}%"`;
        } else if (condition === 'reg_dt') {
            query = `tb_project.${condition} LIKE "%${find}%"`;
        } else if (condition === 'use_yn') {
            query = `tb_project.${condition} LIKE "%${find}%"`;;
        } else {
            throw new BadRequestException("잘못된 값을 입력하셨습니다.")
        }
        return query
    }
}