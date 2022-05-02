import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRepository } from "../domain/admin.repository";
import { AdminSignUpDto } from "./dto/admin.sign-up";

@Injectable()
export class AdminSignUpService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository
    ) {}

    async signUp(adminSignUpDto: AdminSignUpDto): Promise<AdminSignUpDto> {
        return await this.adminRepository.createAdmin(adminSignUpDto);      // DB에 직접 insert하는 경우 repository에서 처리
    }
}