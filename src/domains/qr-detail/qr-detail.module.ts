import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QRDetailRepository } from "./domain/qr-detail.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([QRDetailRepository])
    ],
    exports: [],
    controllers: [],
    providers: [],
})
export class QRDetailModule {}