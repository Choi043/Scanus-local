import { jwtAccessExtractor, refreshExtractor } from './jwt.extractor';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { JwtPayload } from "./jwt.payload";
import { AdminFindService } from 'src/domains/admin/application/admin.find.service';
import { AuthSessionService } from 'src/domains/auth/application/auth.session.service';
import { REFRESH_TOKEN } from 'src/domains/admin/domain/admin.constrants';
// import * as config from 'config';
// const jwtConfig = config.get('jwt');

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
    Strategy,
    'jwt-access'        // jwt 구분하기 위한 string-naming => 현재 프로젝트는 Guard에서 구분
) {
    constructor(
        private readonly adminFindService: AdminFindService,
        private readonly authSessionService: AuthSessionService,
    ) {
        super({
            // secretOrKey: jwtConfig.accessSecretKey,
            secretOrKey: 'dev-scanus-admin-access',
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),        // Req - Authorization - Bearer Token에 토큰 주입
            jwtFromRequest: ExtractJwt.fromExtractors([jwtAccessExtractor]),    // Req - Headers에 토큰 주입
            ignoreExpiration: false,    // 명시적으로 false, jwt가 Passport 모듈에 만료되지 않았는지 확인하는 책임을 위임하는 기본 설정 -> 만료된 jwt와 함께 경로가 제공되면 요청 거부, 401 Unauthorized 응답 전송
            passReqToCallback: true,    // HTTP Request를 그대로 전달할지 여부, 인증 수행용 함수
        })
    }

    async validate(req: any, payload: JwtPayload) {     
        const accessToken = req.headers['authorization'];   // Req - Headers에 있는 객체 중 authorization(key) 값

        // payload에 저장된 index 값으로 admin_idx 조회하여 계정이 존재하는지 확인
        const user = await this.adminFindService.findByIndex(payload.index );

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
            ignoreExpiration: false,
            passReqToCallback: true,
        });
    }
    async validate(req, payload: JwtPayload) {
        const refreshToken = req.cookies[REFRESH_TOKEN];
        const user = await this.adminFindService.findByIndex(payload.index);
        const dbRefreshToken = (await user.adminTokenEntity).refreshToken;      // db에 저장된 refresh 토큰 값

        if (!user) {
            throw new UnauthorizedException('존재하지 않는 사용자입니다.');
        } else if (dbRefreshToken !== refreshToken) {                           // db refreshToken과 cookies refreshToken값 비교
            throw new UnauthorizedException('리프레시 토큰이 일치하지 않습니다.');
        } else {
            return user;
        }
    }
}