import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QRRepository } from "../qr-master/domain/qr.repository";
import { QRDetailColumnCreateService } from "./application/qr-detail.column-create.service";
import { QRDetailRegisterService } from "./application/qr-detail.register.service";
import { QRDetailRepository } from "./domain/qr-detail.repository";
import { QRDetailRegisterController } from "./presentation/qr-detail.register.controller";
import { TestController } from "./presentation/qr-detail.test.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([QRDetailRepository, QRRepository])
    ],
    exports: [],
    controllers: [
        TestController,
        QRDetailRegisterController,
    ],
    providers: [
        QRDetailColumnCreateService,
        QRDetailRegisterService,
    ],
})
export class QRDetailModule {}