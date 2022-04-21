import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectEntity } from "../domain/project.entity";
import { ProjectRepository } from "../domain/project.repository";
import { ProjectEditDto } from "./dto/project.edit";

@Injectable()
export class ProjectEditService {
    constructor(
        @InjectRepository(ProjectRepository)
        private readonly projectRepository: ProjectRepository
    ) { }

    async edit(cmpny_idx: number, editProject: ProjectEditDto): Promise<ProjectEntity> {
        const projectFind = await this.projectRepository.findOne(cmpny_idx);

        projectFind.prjct_nm = editProject.prjct_nm;
        projectFind.sn_yn = editProject.sn_yn;
        projectFind.scratch_type = editProject.scratch_type;
        projectFind.secure_type = editProject.secure_type;
        projectFind.unit_yn = editProject.unit_yn;
        projectFind.pro_cnnc_yn = editProject.pro_cnnc_yn;
        projectFind.surl_yn = editProject.surl_yn;
        projectFind.blockchain_yn = editProject.blockchain_yn;

        await this.projectRepository.save(projectFind)

        return projectFind;
    }
}