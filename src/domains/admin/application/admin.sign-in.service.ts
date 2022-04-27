import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminRepository } from "../domain/admin.repository";
import { AdminSignInDto } from "./dto/admin.sign-in";
import * as bcrypt from 'bcryptjs';
import { AdminFindService } from "./admin.find.service";
import { AuthSessionService } from "src/domains/auth/application/auth.session.service";
import { AuthTokenService } from "src/domains/auth/application/auth.token.service";
import { AdminEntity } from "../domain/admin.entity";

@Injectable()
export class AdminSignInService {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
        // private readonly adminFindService: AdminFindService,
        private readonly authService: AuthTokenService,
        private readonly authSessionService: AuthSessionService,
    ) { }

    async signIn(adminSignInDto: AdminSignInDto): Promise<{
        accessToken: string
        refreshToken: string
    }> {
        const { admin_id, admin_pw } = adminSignInDto;
        const adminFind: AdminEntity = await this.adminRepository.findOne({
            where: { admin_id }
        });
        const { admin_idx } = adminFind;
        if (!adminFind) {
            throw new UnauthorizedException("등록되지 않은 계정입니다.");
        }
        const hashPassword = await bcrypt.compare(admin_pw, adminFind.admin_pw)
        if (!hashPassword) {
            throw new BadRequestException("비밀번호가 일치하지 않습니다.");
        }

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


        return { accessToken, refreshToken }
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
}