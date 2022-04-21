import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AdminModule } from './domains/admin/admin.module';
import { CompanyModule } from './domains/company/company.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AdminModule,
    CompanyModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
