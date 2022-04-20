import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "src/commons/jwt/jwt.payload";
import { FindOneOptions } from "typeorm";
import { AdminEntity } from "../domain/admin.entity";
import { AdminRepository } from "../domain/admin.repository";
import { AdminInfoDto } from "./dto/admin.info";

@Injectable()
export class AdminInfoService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
    ) { }

    async getAdminInfo(admin_idx: number) {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_idx },
            // relations: ['']
        })

        if (!adminFind) {
            throw new BadRequestException('데이터가 존재하지 않습니다.');
        }

        return adminFind;
    }

    async findById(admin_id: string): Promise<AdminEntity> {
        const adminFind = await this.adminRepository.findOne({
            where: { admin_id },
        });

        if (!adminFind) {
            throw new BadRequestException('존재하지 않는 사용자입니다.');
        }

        return adminFind;
    }

    async tokenValidate(payload: JwtPayload): Promise<AdminInfoDto | undefined> {
        return await this.findByFields(
            {where: {userId: payload.userId}
        });
    }

    async findByFields(options: FindOneOptions<AdminInfoDto>): Promise<AdminInfoDto | undefined> {
        return await this.adminRepository.findOne(options);
    }
}