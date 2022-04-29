import { ConflictException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { ProjectRegisterDto } from "../application/dto/project.register";
import { ProjectEntity } from "./project.entity";

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {
    
    async addProject(projectRegisterDto: ProjectRegisterDto): Promise<ProjectEntity> {
        const {  
            // companyEntity, 
            prjct_nm, sn_yn, scratch_type, secure_type, unit_yn, surl_yn, blockchain_yn, pro_cnnc_yn, company_project  } = projectRegisterDto

        const newProject: ProjectEntity = this.create({
            prjct_nm, 
            company_project,
            sn_yn, 
            scratch_type, 
            secure_type, 
            unit_yn, 
            surl_yn, 
            blockchain_yn, 
            pro_cnnc_yn,
        })

        return await this.save(newProject);
    }

    async deleteProject(project_idx: number) {
        const projectFind = await this.findOne(project_idx)

        if(projectFind) {
            await this.delete(project_idx);

            return {
                message: 'success'
            }
        }
        else {
            new ConflictException()
        }
    }
}