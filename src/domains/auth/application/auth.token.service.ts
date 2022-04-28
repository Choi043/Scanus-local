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
        return await this.jwtService.verifyAsync(token, {
            secret: 'dev-scanus-admin-refresh'
            // secret: jwtConfig.refreshSecretKey
        })
    }

    public async createAccessToken(payload: JwtPayload) {
        try {
            const accessToken = await this.jwtService.sign(payload, {
                secret: 'dev-scanus-admin-access'
                // secret: jwtConfig.accessSecretKey,
                // expiresIn: jwtConfig.accessExpireIn
            });
            return accessToken;
        } catch (err) {
            throw new InternalServerErrorException(err.message);
        }
    }

    public async createRefreshToken(payload: JwtPayload) {
        try {
            const refreshToken = await this.jwtService.sign(payload, {
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
        await this.adminTokenRepository.upsert({ adminEntity, refreshToken }, [
            'adminEntity',
        ]);
    }

    public async deleteRefreshToken(adminEntity: AdminEntity) {
        await this.adminTokenRepository.upsert({ adminEntity, refreshToken: '' }, [
            'adminEntity',
        ]);
    }
}