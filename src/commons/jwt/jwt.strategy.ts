import { jwtAccessExtractor, refreshExtractor } from './jwt.extractor';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { AdminInfoService } from "src/domains/admin/application/admin.info.service";
import { AdminRepository } from "src/domains/admin/domain/admin.repository";
import { JwtPayload } from "./jwt.payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(
    Strategy,
    'jwt'
) {
    constructor(
        @InjectRepository(AdminRepository)
        private readonly adminRepository: AdminRepository,
        private readonly adminInfoService: AdminInfoService,
    ) {
        super({
            secretOrKey: 'SECRET_KEY',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            // jwtFromRequest: ExtractJwt.fromExtractors([jwtAccessExtractor]),
            // ignoreExpiration: false,
            // passReqToCallback: true,
        })
    }

    async validate(payload: JwtPayload, done: VerifiedCallback): Promise<any> {
        const { userId } = payload;
        const admin = await this.adminInfoService.findByFields({
            where: { admin_id: userId }
        });

        if (!admin) {
            return done(new UnauthorizedException({ message: '계정이 존재하지 않습니다.' }), false);
        }

        return done(null, admin);
    }
}

// @Injectable()
// export class JwtRefreshStrategy extends PassportStrategy(
//     Strategy,
//     'jwt-refresh',
// ) {
//     constructor(private readonly adminInfoService: AdminInfoService) {
//         super({
//             secretOrKey: 'jwt-refresh-secret_key',
//             jwtFromRequest: ExtractJwt.fromExtractors([refreshExtractor]),
//             // ignoreExpiration: false,
//             // passReqToCallback: true,
//         });
//     }
//     async validate(payload: JwtPayload, done: VerifiedCallback): Promise<any> {
//         // const { userId } = payload;
//         // const admin = await this.adminInfoService.findByFields({
//         //     where : {admin_id: userId}
//         // });

//         // if(!admin) {
//         //     return done(new UnauthorizedException({message: '계정이 존재하지 않습니다.'}), false);
//         // }

//         // return done(null, admin);
//     }
// }