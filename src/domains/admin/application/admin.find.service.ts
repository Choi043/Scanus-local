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
    ) { }

    async findById(admin_id: string): Promise<AdminEntity> {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_id },
        });

        if (!adminFind) {
            throw new BadRequestException('계정 정보가 존재하지 않습니다.');
        }

        return adminFind;
    }

    async findByIndex(admin_idx: number): Promise<AdminEntity> {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_idx },
        });

        if (!adminFind) {
            throw new BadRequestException('계정 정보가 존재하지 않습니다.');
        }

        return adminFind;
    }

    async findByFields(options: FindOneOptions<AdminEntity>): Promise<AdminEntity> {
        const fieldFind = await this.adminRepository.findOne(options);

        if (!fieldFind) {
            throw new BadRequestException(`${options} 정보가 존재하지 않습니다.`)
        }
        return fieldFind;
    }
}