import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BankTransactionsController } from './adapter/controller/bank-transactions.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './adapter/database/database.module';
import { TransactionsService } from './domain/service/transactions.service';
import { TransactionRepository } from './adapter/repository/transaction.repository';
import { UserRepository } from './adapter/repository/user.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    ClientsModule.register([
      {
        name: 'RABBITMQ_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://admin:admin@localhost:5672'],
          queue: 'bank-transaction-to-client-queue',
          queueOptions: {
            durable: true,
          },
        },
      },
    ]),
  ],
  controllers: [BankTransactionsController],
  providers: [
    AppService,
    TransactionsService,
    TransactionRepository,
    UserRepository,
  ],
})
export class AppModule {}
