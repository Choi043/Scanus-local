import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductRepository } from "./domain/product.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([ProductRepository])
    ],
    exports: [],
    controllers: [],
    providers: [],
})
export class ProductModule {}