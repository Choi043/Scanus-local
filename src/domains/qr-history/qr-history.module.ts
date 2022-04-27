import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QRHistoryRepository } from "./domain/qr-history.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([QRHistoryRepository])
    ],
    exports: [],
    controllers: [],
    providers: [],
})
export class QRHistoryModule {}