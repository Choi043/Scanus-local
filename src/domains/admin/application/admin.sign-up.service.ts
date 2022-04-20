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

    async signUp(adminSignUpDto: AdminSignUpDto): Promise<AdminSignUpDto | undefined> {
        return await this.adminRepository.createAdmin(adminSignUpDto);
    }
}