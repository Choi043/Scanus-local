import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QRIssInfoService } from "./application/qr.iss-info.service";
import { QRIssRequestService } from "./application/qr.iss-request.service";
import { QRReqestDeleteService } from "./application/qr.request-delete.service";
import { QRReqestUpdateService } from "./application/qr.request-update.service";
import { QRStateChangeService } from "./application/qr.state-change.service";
import { QRRepository } from "./domain/qr.repository";
import { QrIssInfoController } from "./presentation/qr.iss-info.controller";
import { QRIssRequestController } from "./presentation/qr.iss-request.controller";
import { QRReqestDeleteController } from "./presentation/qr.request-delete.controller";
import { QRReqestUpdateController } from "./presentation/qr.request-update.controller";
import { QRStateChangeController } from "./presentation/qr.state-change.controller";

@Module({
    imports: [
        TypeOrmModule.forFeature([QRRepository])
    ],
    exports: [
        QRIssInfoService,
    ],
    controllers: [
        QRIssRequestController,
        QRReqestUpdateController,
        QRReqestDeleteController,
        QrIssInfoController,
        QRStateChangeController,
    ],
    providers: [
        QRIssRequestService,
        QRReqestUpdateService,
        QRReqestDeleteService,
        QRIssInfoService,
        QRStateChangeService,
    ],
})
export class QRModule {}