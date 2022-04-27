import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QRIssRequestService } from "./application/qr.iss-request.service";
import { QRRepository } from "./domain/qr.repository";
import { QRIssRequestController } from "./presentation/qr.iss-request.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([QRRepository])
    ],
    exports: [],
    controllers: [QRIssRequestController],
    providers: [QRIssRequestService],
})
export class QRModule {}