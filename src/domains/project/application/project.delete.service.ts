import { RoleGuard } from 'src/commons/role/role.guard';
import { JwtAuthGuard } from 'src/commons/jwt/jwt.auth.guard';
import { Injectable, UseGuards } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectRepository } from "../domain/project.repository";
import { Roles } from 'src/commons/role/role.decorator';
import { AdminType } from 'src/domains/admin/domain/admin.role';
import { QRIssInfoService } from 'src/domains/qr-master/application/qr.iss-info.service';

@Injectable()
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(AdminType.MASTER)
export class ProjectDeleteService {
    constructor(
        @InjectRepository(ProjectRepository)
        private readonly projectRepository: ProjectRepository,
        private readonly qrIssInfoService : QRIssInfoService,
    ) {}

    async deleteProject(prjct_idx: number) {
        const findProject = await this.projectRepository.findOne(prjct_idx)

        const findToProject = await this.qrIssInfoService.getQrToProejct(prjct_idx)
        const checkProject =  findToProject[1];        

        if (findProject && !checkProject){
            await this.projectRepository.delete(prjct_idx)
            
            return {
                message: "삭제 완료"
            }
        } else if(checkProject) {
            return {
                message: "다른 테이블과 연관되어 삭제할 수 없습니다."
            }
        }
        return {
            message: "입력한 값이 존재하지 않습니다."
        }
    }

}