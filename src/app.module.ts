import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AdminModule } from './domains/admin/admin.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    AdminModule
  ],
  controllers: [AppController],
})
export class AppModule {}
