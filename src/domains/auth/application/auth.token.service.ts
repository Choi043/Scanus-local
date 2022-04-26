import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { AdminTokenRepository } from "../domain/admin.token.repository";
import * as config from 'config';
import { JwtPayload } from "src/commons/jwt/jwt.payload";
import { AdminEntity } from "src/domains/admin/domain/admin.entity";
// const jwtConfig = config.get('jwt');

@Injectable()
export class AuthTokenService {
    constructor(
        @InjectRepository(AdminTokenRepository)
        private readonly adminTokenRepository: AdminTokenRepository,
        // private readonly jwtService: JwtService,
    ) { }

    // public async verifyRefreshToken(token) {
    //     return await this.jwtService.verifyAsync(token, {
    //         // secret: jwtConfig.refreshSecretKey
    //         secret: 'secretkey'
    //     })
    // }

    // public async createAccessToken(payload: JwtPayload) {
    //     try {
    //         const accessToken = await this.jwtService.signAsync(payload, {
    //             // secret: jwtConfig.accessSecretKey,
    //             // expiresIn: jwtConfig.accessExpireIn
    //         });
    //         return accessToken;
    //     } catch (err) {
    //         throw new InternalServerErrorException(err.message);
    //     }
    // }

    // public async createRefreshToken(payload: JwtPayload) {
    //     try {
    //         const refreshToken = await this.jwtService.signAsync(payload, {
    //             // secret: jwtConfig.refreshSecretKey,
    //             secret: 'secretkey',
    //             // expiresIn: jwtConfig.refreshExpireIn,
    //         });
    //         return refreshToken;
    //     } catch (err) {
    //         throw new InternalServerErrorException(err.message);
    //     }
    // }

    // public async setRefreshToken(adminEntity: AdminEntity, refreshToken: string) {
    //     await this.adminTokenRepository.upsert({ adminEntity, refreshToken }, [
    //         'adminEntity',
    //     ]);
    // }

    // public async deleteRefreshToken(adminEntity: AdminEntity) {
    //     await this.adminTokenRepository.upsert({ adminEntity, refreshToken: '' }, [
    //         'adminEntity',
    //     ]);
    // }
}