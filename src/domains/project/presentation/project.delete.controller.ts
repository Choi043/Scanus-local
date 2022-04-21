import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProjectDeleteService } from "../application/project.delete.service";

@Controller('project')
export class ProjectDeleteController {
    constructor(
        private readonly projectDeleteService: ProjectDeleteService
    ) {}

    @Post('/delete')
    @UsePipes(ValidationPipe)
    async leaveCompany(
        @Body('prjct_idx') project_idx: number
    ):Promise<any> {
        return this.projectDeleteService.deleteProject(project_idx);
    }
}