import { forwardRef, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthSessionService } from "../auth/application/auth.session.service";
import { AuthTokenService } from "../auth/application/auth.token.service";
import { AuthModule } from "../auth/auth.module";
import { AdminSignOutService } from "./application/admin-sign-out.service";
import { AdminFindService } from "./application/admin.find.service";
import { AdminInfoService } from "./application/admin.info.service";
import { AdminSignInService } from "./application/admin.sign-in.service";
import { AdminSignUpService } from "./application/admin.sign-up.service";
import { AdminRepository } from "./domain/admin.repository";
import { AdminInfoController } from "./presentation/admin.info.controller";
import { AdminSignInController } from "./presentation/admin.sign-in.controller";
import { AdminSignOutController } from "./presentation/admin.sign-out.controller";
import { AdminSignUpController } from "./presentation/admin.sign-up.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminRepository]),
        // PassportModule,
        forwardRef(() => AuthModule),
    ],
    exports: [
        // TypeOrmModule,
        // PassportModule,
        AdminFindService,
    ],
    controllers: [
        AdminSignUpController,
        AdminSignInController,
        AdminSignOutController,
        AdminInfoController,
    ],
    providers: [
        AdminSignUpService,
        AdminSignInService,
        AdminSignOutService,
        AdminInfoService,
        AdminFindService,
        AuthSessionService,
    ],
})
export class AdminModule {}