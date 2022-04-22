import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationOptions } from "src/commons/typeorm/paginate/pagination.option";
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

    async list2(options: PaginationOptions) {
        const { take, page } = options;
        return "언젠간 사용하겠습니다."
    }
    
    async infoChannel(condition: string, find: string) {
        
        return await this.projectRepository
            .createQueryBuilder('tb_project')
            .select([
                // 'tb_company.cmpny_nm'
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
            // .innerJoin('tb_project.prjct_idx', 'tb_company')
            .where(`tb_project.${condition} LIKE "${find}%"`)
            .orderBy('tb_project.reg_dt', 'ASC')
            .getManyAndCount()
    }
}