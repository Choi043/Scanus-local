import { jwtAccessExtractor, refreshExtractor } from './jwt.extractor';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AdminInfoService } from "src/domains/admin/application/admin.info.service";
import { AdminRepository } from "src/domains/admin/domain/admin.repository";
import { JwtPayload } from "./jwt.payload";
import { AdminFindService } from 'src/domains/admin/application/admin.find.service';
import { AuthSessionService } from 'src/domains/auth/application/auth.session.service';
import { REFRESH_TOKEN } from 'src/domains/admin/domain/admin.constrants';
// import * as config from 'config';
// const jwtConfig = config.get('jwt');

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
    Strategy,
    'jwt-access'
) {
    constructor(
        private readonly adminFindService: AdminFindService,
        private readonly authSessionService: AuthSessionService,
    ) {
        super({
            // secretOrKey: jwtConfig.accessSecretKey,
            secretOrKey: 'dev-scanus-admin-access',
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            jwtFromRequest: ExtractJwt.fromExtractors([jwtAccessExtractor]),
            ignoreExpiration: false,
            passReqToCallback: true,
        })
    }

    // async validate(payload: JwtPayload, done: VerifiedCallback): Promise<any> {
    //     const admin = await this.adminFindService.findByFields({
    //         where: { admin_idx: payload.index }
    //     });

    //     if (!admin) {
    //         return done(new UnauthorizedException({ message: '계정이 존재하지 않습니다.' }), false);
    //     }

    //     return done(null, admin);
    // }

    async validate(req: any, payload: JwtPayload) {
        const accessToken = req.headers['authorization'];
        const user = await this.adminFindService.findByFields({
            where: { admin_idx: payload.index }
        });

        if (!user) {
            return new UnauthorizedException('계정이 존재하지 않습니다.');
        }
        // if (!this.authSessionService.validateAccessToken(user.admin_idx, accessToken)) {
        //     throw new ConflictException('다른 기기에서 로그인 되었습니다.');
        // }

        return user;
    }

}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(
        private readonly adminFindService: AdminFindService
    ) {
        super({
            secretOrKey: 'dev-scanus-admin-refresh',
            // secretOrKey: jwtConfig.refreshSecretKey,
            jwtFromRequest: ExtractJwt.fromExtractors([refreshExtractor]),
            // ignoreExpiration: false,
            // passReqToCallback: true,
        });
    }
    async validate(req, payload: JwtPayload) {
        const refreshToken = req.cookies[REFRESH_TOKEN];
        const user = await this.adminFindService.findByIndex(payload.index);
        const dbRefreshToken = (await user.adminTokenEntity).refreshToken;

        if (!user) {
            throw new UnauthorizedException('존재하지 않는 사용자입니다.');
        } else if (dbRefreshToken !== refreshToken) {
            throw new UnauthorizedException('리프레시 토큰이 일치하지 않습니다.');
        } else {
            return user;
        }
    }
}