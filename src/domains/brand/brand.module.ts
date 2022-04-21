import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BrandEditService } from "./application/brand.edit.Service";
import { BrandInfoService } from "./application/brand.info.service";
import { BrandRegisterService } from "./application/brand.register.service";
import { BrandRepository } from "./domain/brand.repository";
import { BrandEditController } from "./presentation/brand.edit.controller";
import { BrandInfoController } from "./presentation/brand.info.controller";
import { BrandRegisterController } from "./presentation/brand.register.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([BrandRepository])
    ],
    exports: [],
    controllers: [
        BrandRegisterController,
        BrandEditController,
        BrandInfoController,
    ],
    providers: [
        BrandRegisterService,
        BrandEditService,
        BrandInfoService,
    ],
})
export class BrandModule {}