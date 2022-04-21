import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AdminModule } from './domains/admin/admin.module';
import { CompanyModule } from './domains/company/company.module';
// import { ProjectModule } from './domains/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AdminModule,
    CompanyModule,
    // ProjectModule
  ],
  controllers: [AppController],
})
export class AppModule {}
