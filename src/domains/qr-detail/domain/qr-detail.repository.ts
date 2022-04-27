import { EntityRepository, Repository } from "typeorm";
import { QRDetailEntity } from "./qr-detail.entity";

@EntityRepository(QRDetailEntity)
export class QRDetailRepository extends Repository<QRDetailEntity> {}