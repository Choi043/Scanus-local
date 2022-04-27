import { EntityRepository, Repository } from "typeorm";
import { QRHistoryEntity } from "./qr-history.entity";

@EntityRepository(QRHistoryEntity)
export class QRHistoryRepository extends Repository<QRHistoryEntity> {}