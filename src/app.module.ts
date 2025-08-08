import { Module } from '@nestjs/common';
import { BankTransactionsController } from './adapter/controller/bank-transactions.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [BankTransactionsController],
  providers: [AppService],
})
export class AppModule {}
