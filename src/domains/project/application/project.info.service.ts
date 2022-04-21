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
}