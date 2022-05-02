import { Controller, Get, Param, Query, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CurrentChannel } from "src/commons/decorator/decorator.current.req";
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
    async getInfoList() {
        return this.projectInfoService.list();
    }

    @Get('/list')
    @UseGuards(JwtAuthGuard)
    async getProjectList(
        @CurrentChannel() req: Request
        ) {
            let condition: string
            let find: string
            if( req === undefined ) {
                condition = 'prjct_idx'
                find = ''
            } else {
                condition = req[0]
                find = String(req[1])
            }
            return await this.projectInfoService.infoChannel( condition, find );
        }
}