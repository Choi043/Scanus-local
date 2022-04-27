import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
import { AdminEntity } from "src/domains/admin/domain/admin.entity";
import { AdminTokenEntity } from "src/domains/auth/domain/admin.token.entity";
import { BrandEntity } from "src/domains/brand/domain/brand.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";
import { ProductEntity } from "src/domains/product/domain/product.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";
import { QRDetailEntity } from "src/domains/qr-detail/domain/qr-detail.entity";
import { QREntity } from "src/domains/qr-master/domain/qr.entity";


const dbConfig = config.get('db');

export const TypeormConfig = {
    useFactory: async (): Promise<TypeOrmModuleOptions> => ({
        type: 'mysql',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        synchronize: true,
        // autoLoadEntities: dbConfig.autoLoadEntities,
        // logging: dbConfig.logging,
        // keepConnectionAlive: dbConfig.keepConnectionAlive,
        entities: [
            AdminEntity,
            CompanyEntity,
            ProjectEntity,
            BrandEntity,
            ProductEntity,
            CompanyProjectEntity,
            AdminTokenEntity,
            QREntity,
            QRDetailEntity,
        ],
    })
}