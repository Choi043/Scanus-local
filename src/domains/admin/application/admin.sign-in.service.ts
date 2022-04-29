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

        await this.comparePassword(admin_pw, adminFind)

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
        compareAdmin: AdminEntity,
    ): Promise<void> {
        // 비밀번호 검증 로직, 비밀번호 5회 이상 오류시 로그인 불가
        if (compareAdmin.pw_count >= 4) {
            throw new BadRequestException("비밀번호 오류가 5회 이상이어서 로그인할 수 없습니다.")
        }
        
        // 입력된 password(compare에서 bcrypt 처리)와 DB에 저장된 compareAdmin.admin_pw 를 비교하여 두 값이 일치하다면 true, 틀리면 false를 반환
        const hashPassword = await bcrypt.compare(password, compareAdmin.admin_pw)
        // hash된 값이 틀린 경우 false이지만 !식별자를 통해 not false -> true
        if (!hashPassword) {
            compareAdmin.pw_count += 1;     // 기존에 가져왔던 계정의 DB값 pw_count에 +1을 해서 오류 횟수 증가
            await this.adminRepository.save(compareAdmin);  // DB에 변경된 값 저장
            throw new BadRequestException("비밀번호가 일치하지 않습니다.");
        }
        else {      // 비밀번호 값이 틀리지 않고 정상적으로 로그인이 진행되고 있는 경우
            compareAdmin.pw_count = 0;      // 계정의 DB값 pw_count를 0으로 돌려줌
            await this.adminRepository.save(compareAdmin);  // DB에 변경된 값 저장
        }
    }
}