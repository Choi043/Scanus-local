import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "src/commons/jwt/jwt.payload";
import { AdminRepository } from "../domain/admin.repository";
import { AdminSignInDto } from "./dto/admin.sign-in";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminSignInService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
        private readonly jwtService: JwtService,
    ) { }

    async signIn(adminSignInDto: AdminSignInDto): Promise<{ accessToken: string } | undefined> {
        const { admin_id, admin_pw } = adminSignInDto;
        const adminFind: AdminSignInDto = await this.adminRepository.findOne({
            where: {admin_id}
        });
        if(!adminFind) {
            throw new UnauthorizedException("등록되지 않은 계정입니다.");
        }
        const payload: JwtPayload = {
            userId: adminFind.admin_id,
            role: adminFind.admin_type
        };
        const accessToken = this.jwtService.sign(payload);

        const hashPassword = await bcrypt.compare(admin_pw, adminFind.admin_pw)
        if(!hashPassword) {
            throw new BadRequestException("비밀번호가 일치하지 않습니다.");
        }
        else {
            return { accessToken };
        }
    }
}