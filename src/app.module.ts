import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TypeormConfig } from './commons/typeorm/typeorm.config';
import { AdminModule } from './domains/admin/admin.module';
import { AuthModule } from './domains/auth/auth.module';
import { BrandModule } from './domains/brand/brand.module';
import { CompanyModule } from './domains/company/company.module';
import { CompanyProjectModule } from './domains/company_project/company_project.module';
import { ProductModule } from './domains/product/product.module';
import { ProjectModule } from './domains/project/project.module';
import { QRDetailModule } from './domains/qr-detail/qr-detail.module';
import { QRModule } from './domains/qr-master/qr.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(TypeormConfig),
    AdminModule,
    AuthModule,
    CompanyModule,
    ProjectModule,
    BrandModule,
    ProductModule,
    CompanyProjectModule,
    QRModule,
    QRDetailModule,
  ],
  controllers: [AppController],
})
export class AppModule {}


