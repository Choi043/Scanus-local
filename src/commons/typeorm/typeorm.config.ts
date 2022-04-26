import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';
import { AdminEntity } from "src/domains/admin/domain/admin.entity";
import { BrandEntity } from "src/domains/brand/domain/brand.entity";
import { CompanyEntity } from "src/domains/company/domain/company.entity";
import { CompanyProjectEntity } from "src/domains/company_project/domain/company_project.entity";
import { ProductEntity } from "src/domains/product/domain/product.entity";
import { ProjectEntity } from "src/domains/project/domain/project.entity";


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
        ],
    })
}