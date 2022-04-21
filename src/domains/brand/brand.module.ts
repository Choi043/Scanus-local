import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandRegisterService } from "./application/brand.register.service";
import { BrandRepository } from "./domain/brand.repository";
import { BrandRegisterController } from "./presentation/brand.register.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([BrandRepository])
    ],
    exports: [],
    controllers: [
        BrandRegisterController,
    ],
    providers: [
        BrandRegisterService,
    ],
})
export class BrandModule {}