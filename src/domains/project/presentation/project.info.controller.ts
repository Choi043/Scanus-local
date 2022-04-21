import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { ProjectInfoService } from "../application/project.info.service";

@Controller('project')
export class ProjectInfoController {
    constructor(
        private readonly projectInfoService : ProjectInfoService
    ) {}
    
    @Get('/info/:id')
    @UseGuards(JwtAuthGuard)
    async getInfo(@Param('id') id: number) {
        return this.projectInfoService.getProjectInfo(id);
    }
}