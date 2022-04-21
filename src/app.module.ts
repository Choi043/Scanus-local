import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TypeormConfig } from './commons/typeorm/typeorm.config';
import { AdminModule } from './domains/admin/admin.module';
import { BrandModule } from './domains/brand/brand.module';
import { CompanyModule } from './domains/company/company.module';
import { ProductModule } from './domains/product/product.module';
import { ProjectModule } from './domains/project/project.module';
// import { ProjectModule } from './domains/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeormConfig),
    AdminModule,
    CompanyModule,
    ProjectModule,
    BrandModule,
    ProductModule,
  ],
  controllers: [AppController],
})
export class AppModule {}


