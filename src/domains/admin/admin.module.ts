import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminSignUpService } from "./application/admin.sign-up.service";
import { AdminRepository } from "./domain/admin.repository";
import { AdminSignUpController } from "./presentation/admin.sign-up.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([AdminRepository]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'SECRET_KEY',
            signOptions: {expiresIn: 3600}
        }),
    ],
    exports: [
        TypeOrmModule,
        PassportModule,
    ],
    controllers: [
        AdminSignUpController
    ],
    providers: [
        AdminSignUpService
    ],
})
export class AdminModule {}