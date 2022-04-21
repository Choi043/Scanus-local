import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "src/commons/jwt/jwt.strategy";
import { AdminInfoService } from "./application/admin.info.service";
import { AdminSignInService } from "./application/admin.sign-in.service";
import { AdminSignUpService } from "./application/admin.sign-up.service";
import { AdminRepository } from "./domain/admin.repository";
import { AdminInfoController } from "./presentation/admin.info.controller";
import { AdminSignInController } from "./presentation/admin.sign-in.controller";
import { AdminSignUpController } from "./presentation/admin.sign-up.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'SECRET_KEY',
            signOptions: {expiresIn: 3600*24}
        }),
    ],
    exports: [
        TypeOrmModule,
        PassportModule,
        JwtStrategy,
    ],
    controllers: [
        AdminSignUpController,
        AdminSignInController,
        AdminInfoController,
    ],
    providers: [
        AdminSignUpService,
        AdminSignInService,
        AdminInfoService,
        JwtStrategy,
    ],
})
export class AdminModule {}