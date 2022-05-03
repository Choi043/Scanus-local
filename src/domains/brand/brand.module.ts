import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductInfoService } from "../product/application/product.info.service";
import { ProductRepository } from "../product/domain/product.repository";
import { BrandDeleteService } from "./application/brand.delete.service";
import { BrandEditService } from "./application/brand.edit.Service";
import { BrandInfoService } from "./application/brand.info.service";
import { BrandRegisterService } from "./application/brand.register.service";
import { BrandRepository } from "./domain/brand.repository";
import { BrandDeleteController } from "./presentation/brand.delete.controller";
import { BrandEditController } from "./presentation/brand.edit.controller";
import { BrandInfoController } from "./presentation/brand.info.controller";
import { BrandRegisterController } from "./presentation/brand.register.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([BrandRepository, ProductRepository])
    ],
    exports: [],
    controllers: [
        BrandRegisterController,
        BrandEditController,
        BrandInfoController,
        BrandDeleteController,
    ],
    providers: [
        BrandRegisterService,
        BrandEditService,
        BrandInfoService,
        BrandDeleteService,
        ProductInfoService,
    ],
})
export class BrandModule {}