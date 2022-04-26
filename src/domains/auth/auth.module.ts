import { forwardRef, Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAccessStrategy, JwtRefreshStrategy } from "src/commons/jwt/jwt.strategy";
import { AdminModule } from "../admin/admin.module";
import { AuthSessionService } from "./application/auth.session.service";
import { AuthTokenService } from "./application/auth.token.service";
import { AdminTokenRepository } from "./domain/admin.token.repository";

@Module({
    imports: [
        JwtModule.register({}),
        // forwardRef(() => AdminModule),
        TypeOrmModule.forFeature([AdminTokenRepository])
    ],
    exports: [
        AuthTokenService,
        AuthSessionService,
    ],
    controllers: [],
    providers: [
        // JwtAccessStrategy,
        // JwtRefreshStrategy,
        AuthTokenService,
        AuthSessionService,
    ],
})
export class AuthModule {}