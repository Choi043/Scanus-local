import { EntityRepository, Repository } from "typeorm";
import { ProjectRegisterDto } from "../application/dto/project.register";
import { ProjectEntity } from "./project.entity";

@EntityRepository(ProjectEntity)
export class ProjectRepository extends Repository<ProjectEntity> {
    
    async addProject(projectRegisterDto: ProjectRegisterDto): Promise<ProjectEntity> {
        const {  prjct_nm, sn_yn, scratch_type, secure_type, unit_yn, surl_yn, blockchain_yn, pro_cnnc_yn } = projectRegisterDto

        const newCompany: ProjectEntity = this.create({
            prjct_nm, 
            sn_yn, 
            scratch_type, 
            secure_type, 
            unit_yn, 
            surl_yn, 
            blockchain_yn, 
            pro_cnnc_yn,
        })

        return await this.save(newCompany);
    }
}