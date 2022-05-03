import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductDeleteService } from "./application/product.delete.service";
import { ProductEditService } from "./application/product.edit.service";
import { ProductInfoService } from "./application/product.info.service";
import { ProductRegisterService } from "./application/product.register.service";
import { ProductRepository } from "./domain/product.repository";
import { ProductDeleteController } from "./presentation/product.delete.controller";
import { ProductEditController } from "./presentation/product.edit.controller";
import { ProductInfoController } from "./presentation/product.info.controller";
import { ProductRegisterController } from "./presentation/product.register.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository])
    ],
    exports: [
        ProductInfoService
    ],
    controllers: [
        ProductRegisterController,
        ProductInfoController,
        ProductEditController,
        ProductDeleteController,
    ],
    providers: [
        ProductRegisterService,
        ProductInfoService,
        ProductEditService,
        ProductDeleteService,
    ],
})
export class ProductModule {}