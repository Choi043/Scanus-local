import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectRepository } from "../domain/project.repository";

@Injectable()
export class ProjectDeleteService {
    constructor(
        @InjectRepository(ProjectRepository)
        private readonly projectRepository: ProjectRepository
    ) {}

    async deleteProject(project_idx: number) {
        const findProject = await this.projectRepository.findOne(project_idx)

        if (findProject){
            await this.projectRepository.delete(project_idx)
            return {
                message: "삭제 완료"
            }
        } 
        return {
            message: "입력한 값이 존재하지 않습니다."
        }
    }

}