import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ProjectRepository } from "../domain/project.repository";
import { ProjectRegisterDto } from "./dto/project.register";

@Injectable()
export class ProjectRegisterService {
    constructor(
        @InjectRepository(ProjectRepository)
        private readonly projectRepository: ProjectRepository
    ) {}

    async register(projectRegisterDto: ProjectRegisterDto): Promise<ProjectRegisterDto | undefined> {
        return await this.projectRepository.addProject(projectRegisterDto);
    }
}