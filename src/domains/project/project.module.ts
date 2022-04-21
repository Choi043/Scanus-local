import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProjectEditService } from "./application/project.edit.service";
import { ProjectInfoService } from "./application/project.info.service";
import { ProjectRegisterService } from "./application/project.register.service";
import { ProjectRepository } from "./domain/project.repository";
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
    ],
    providers: [
        ProjectRegisterService,
        ProjectEditService,
        ProjectInfoService,
    ],
})
export class ProjectModule {}