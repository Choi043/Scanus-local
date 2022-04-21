import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectDeleteService } from "./application/project.delete.service";
import { ProjectEditService } from "./application/project.edit.service";
import { ProjectInfoService } from "./application/project.info.service";
import { ProjectRegisterService } from "./application/project.register.service";
import { ProjectRepository } from "./domain/project.repository";
import { ProjectDeleteController } from "./presentation/project.delete.controller";
import { ProjectEditController } from "./presentation/project.edit.controller";
import { ProjectInfoController } from "./presentation/project.info.controller";
import { ProjectRegisterController } from "./presentation/project.register.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProjectRepository])
    ],
    exports: [],
    controllers: [
        ProjectRegisterController,
        ProjectEditController,
        ProjectInfoController,
        ProjectDeleteController,
    ],
    providers: [
        ProjectRegisterService,
        ProjectEditService,
        ProjectInfoService,
        ProjectDeleteService,
    ],
})
export class ProjectModule {}