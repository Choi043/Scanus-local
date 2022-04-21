import { Body, Controller, Param, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { ProjectEditDto } from "../application/dto/project.edit";
import { ProjectEditService } from "../application/project.edit.service";
import { ProjectEntity } from "../domain/project.entity";

@Controller('project')
export class ProjectEditController {
    constructor(
        private readonly projectEditService: ProjectEditService
    ){}

    @Patch('/edit/:id')
    @UsePipes(ValidationPipe)
    async editCompany(
        @Param('id') id: number,
        @Body() projectEditDto: ProjectEditDto
    ):Promise<ProjectEntity> {
        return this.projectEditService.edit(id, projectEditDto);
    }
}