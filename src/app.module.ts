import { Module } from '@nestjs/common';
import { AppController } from './adapter/controller/bank-transactions.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
