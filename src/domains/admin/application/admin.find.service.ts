import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions } from "typeorm";
import { AdminEntity } from "../domain/admin.entity";
import { AdminRepository } from "../domain/admin.repository";
import { AdminInfoDto } from "./dto/admin.info";

@Injectable()
export class AdminFindService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository
    ) {}





    async findById(admin_id: string): Promise<AdminEntity> {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_id },
        });

        if (!adminFind) {
            throw new BadRequestException('존재하지 않는 사용자입니다.');
        }

        return adminFind;
    }

    async findByFields(options: FindOneOptions<AdminInfoDto>): Promise<AdminInfoDto | undefined> {
        return await this.adminRepository.findOne(options);
    }
}