import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminTokenRepository } from "../domain/admin.token.repository";
import { JwtPayload } from "src/commons/jwt/jwt.payload";
import { AdminEntity } from "src/domains/admin/domain/admin.entity";
// import * as config from 'config';
// const jwtConfig = config.get('jwt');

@Injectable()
export class AuthTokenService {
    constructor(
        @InjectRepository(AdminTokenRepository)
        private readonly adminTokenRepository: AdminTokenRepository,
        private readonly jwtService: JwtService,
    ) { }

    public async verifyRefreshToken(token: string) {
        // jwt.verfyAsync( token, secretKey, callback-Func. )함수를 이용하여 토큰 유효성 확인
        // token : client에게서 받은 token   ||   secretKey : token 생성 시 사용했던 secretKey
        return await this.jwtService.verifyAsync(token, {       
            secret: 'dev-scanus-admin-refresh'
            // secret: jwtConfig.refreshSecretKey
        })
    }

    public async createAccessToken(payload: JwtPayload) {
        try {
            const accessToken = await this.jwtService.signAsync(payload, {      // 유저 정보가 맞다면 jwt(accessToken)으로 변환
                secret: 'dev-scanus-admin-access'
                // secret: jwtConfig.accessSecretKey,                           // jwtConfig에서 jwt.accessSecretKey 호출
                // expiresIn: jwtConfig.accessExpireIn                          // jwtConfig에서 jwt.accessExpireIn 호출
            });
            return accessToken;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    public async createRefreshToken(payload: JwtPayload) {
        try {
            const refreshToken = await this.jwtService.signAsync(payload, {
                secret: 'dev-scanus-admin-refresh',
                // secret: jwtConfig.refreshSecretKey,
                // expiresIn: jwtConfig.refreshExpireIn,
            });
            return refreshToken;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    public async setRefreshToken(adminEntity: AdminEntity, refreshToken: string) {
        // tb_admin_token에서 두 번째 인자'adminEntity'(admin_idx)로 ON CONFLICT를 수행, 
        // 값이 없다면 (adminEntity, refreshToken) insert, 있다면 update
        await this.adminTokenRepository.upsert({ adminEntity, refreshToken }, [
            'adminEntity',
        ]);
    }

    public async deleteRefreshToken(adminEntity: AdminEntity) {
        // refreshToken에 빈 값을 삽입하여 insert, 'adminEntity'(admin_idx)값이 있다면(세션이 있다면) update
        await this.adminTokenRepository.upsert({ adminEntity, refreshToken: '' }, [
            'adminEntity',
        ]);
    }
}