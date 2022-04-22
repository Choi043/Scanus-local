import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { ProjectInfoService } from "../application/project.info.service";

@Controller('project')
export class ProjectInfoController {
    constructor(
        private readonly projectInfoService: ProjectInfoService
    ) { }

    @Get('/info/:id')
    @UseGuards(JwtAuthGuard)
    async getInfo(@Param('id') id: number) {
        return this.projectInfoService.getProjectInfo(id);
    }

    @Get('/infolist')
    @UseGuards(JwtAuthGuard)
    async getInfoList(
        @Req() req: Request
    ) {
        const condition = Object.entries(req.body)[0][0]
        const find: string = String(Object.entries(req.body)[0][1])
        return await this.projectInfoService.infoChannel( condition, find );
    }
}