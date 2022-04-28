import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRepository } from "../domain/admin.repository";
import { AdminSignInDto } from "./dto/admin.sign-in";
import * as bcrypt from 'bcryptjs';
import { AdminFindService } from "./admin.find.service";
import { AuthSessionService } from "src/domains/auth/application/auth.session.service";
import { AuthTokenService } from "src/domains/auth/application/auth.token.service";
import { AdminEntity } from "../domain/admin.entity";
import { AdminSignInResponse } from "./dto/admin-sign-in.response";

@Injectable()
export class AdminSignInService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
        private readonly adminFindService: AdminFindService,
        private readonly authService: AuthTokenService,
        private readonly authSessionService: AuthSessionService,
    ) { }

    async signIn(adminSignInDto: AdminSignInDto): Promise<{
        adminSignInResponse: AdminSignInResponse;
        accessToken: string
        refreshToken: string
    }> {
        const { admin_id, admin_pw } = adminSignInDto;
        const adminFind: AdminEntity = await this.adminFindService.findById(admin_id);

        const { admin_idx } = adminFind;

        await this.comparePassword(admin_pw, adminFind.admin_pw)

        const accessToken = await this.authService.createAccessToken({
            index: admin_idx,
            role: adminFind.admin_type,
        });
        const refreshToken = await this.authService.createRefreshToken({
            index: admin_idx,
            role: adminFind.admin_type,
        });

        await this.authService.setRefreshToken(adminFind, refreshToken)

        this.authSessionService.addSession(admin_idx, accessToken, refreshToken);
        this.authSessionService.printSession()

        const adminSignInResponse = AdminSignInResponse.of(adminFind);

        return { adminSignInResponse, accessToken, refreshToken }
    }

    public async refreshToken(user: AdminEntity): Promise<{
        accessToken: string;
        refreshToken: string;
    }> {
        const { admin_idx } = user;

        const accessToken = await this.authService.createAccessToken({
            index: admin_idx,
            role: user.admin_type,
        });
        const refreshToken = await this.authService.createRefreshToken({
            index: admin_idx,
            role: user.admin_type,
        });

        await this.authService.setRefreshToken(user, refreshToken);

        this.authSessionService.addSession(admin_idx, accessToken, refreshToken);
        this.authSessionService.printSession();

        return { accessToken, refreshToken };
    }

    public async comparePassword(
        password: string,
        comparePassword: string,
    ): Promise<void> {
        const hashPassword = await bcrypt.compare(password, comparePassword)
        if (!hashPassword) {
            throw new BadRequestException("비밀번호가 일치하지 않습니다.");
        }
    }
}