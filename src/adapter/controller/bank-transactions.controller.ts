import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppService } from '../../app.service';
import { TransactionRequest } from '../dto/transaction-request.dto';
import { TransactionResponse } from '../dto/transaction-response.dto';
import { TransactionDetailsResponse } from '../dto/transaction-details.dto';
import { TransactionListResponse } from '../dto/transaction-list.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('transactions')
@Controller('api')
export class BankTransactionsController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Create a new bank transaction' })
  @ApiResponse({ status: 200, description: 'Transaction created successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid transaction data.' })
  @Post('transactions')
  createTransaction(@Body() transactionData: TransactionRequest): TransactionResponse {
    // Validação básica dos parâmetros
    if (!transactionData.senderUserId || !transactionData.receiverUserId || 
        !transactionData.amount || !transactionData.description) {
      return {
        status: 'error',
        message: 'Todos os parâmetros são obrigatórios: senderUserId, receiverUserId, amount, description'
      };
    }

    if (transactionData.amount <= 0) {
      return {
        status: 'error',
        message: 'O valor da transação deve ser maior que zero'
      };
    }

    if (transactionData.senderUserId === transactionData.receiverUserId) {
      return {
        status: 'error',
        message: 'O usuário remetente não pode ser o mesmo que o destinatário'
      };
    }

    try {
      // Gerar um ID único para a transação usando UUID v4
      const transactionId = `TXN_${randomUUID()}`;
      
      //TODO: Adicionar chamada para o domain
      
      return {
        status: 'success',
        transactionId: transactionId,
        message: 'Transação processada com sucesso'
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erro interno do servidor ao processar a transação'
      };
    }
  }

  @ApiOperation({ summary: 'Get transaction details by ID' })
  @ApiResponse({ status: 200, description: 'Transaction details retrieved successfully.' })
  @ApiResponse({ status: 404, description: 'Transaction not found.' })
  @Get('transactions/:transactionId')
  getTransactionDetails(@Param('transactionId') transactionId: string): TransactionDetailsResponse {
    // Validação básica do parâmetro
    if (!transactionId) {
      return {
        status: 'error',
        message: 'ID da transação é obrigatório'
      };
    }

    try {
      //TODO: Adicionar chamada para o domain para buscar a transação
      
      // Simulação de dados - substituir pela lógica real do domain
      const mockTransaction = {
        transactionId: transactionId,
        senderUserId: 'user123',
        receiverUserId: 'user456',
        amount: 100.50,
        description: 'Transferência PIX',
        status: 'completed',
        createdAt: new Date().toISOString()
      };

      // Verificar se a transação existe (mock - substituir pela lógica real)
      if (!transactionId.startsWith('TXN_')) {
        return {
          status: 'error',
          message: 'Transação não encontrada'
        };
      }

      return {
        status: 'success',
        data: mockTransaction,
        message: 'Detalhes da transação recuperados com sucesso'
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erro interno do servidor ao buscar a transação'
      };
    }
  }

  @ApiOperation({ summary: 'Get transactions list by user ID' })
  @ApiResponse({ status: 200, description: 'User transactions retrieved successfully.' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid user ID.' })
  @Get('transactions/user/:userId')
  getUserTransactions(@Param('userId') userId: string): TransactionListResponse {
    // Validação básica do parâmetro
    if (!userId) {
      return {
        status: 'error',
        message: 'ID do usuário é obrigatório'
      };
    }

    try {
      //TODO: Adicionar chamada para o domain para buscar as transações do usuário
      
      // Simulação de dados - substituir pela lógica real do domain
      const mockTransactions = [
        {
          transactionId: 'TXN_001',
          senderUserId: userId,
          receiverUserId: 'user456',
          amount: 100.50,
          description: 'Transferência PIX',
          status: 'completed',
          createdAt: '2025-08-07T10:00:00.000Z'
        },
        {
          transactionId: 'TXN_002',
          senderUserId: 'user789',
          receiverUserId: userId,
          amount: 250.00,
          description: 'Pagamento de serviços',
          status: 'completed',
          createdAt: '2025-08-06T15:30:00.000Z'
        },
        {
          transactionId: 'TXN_003',
          senderUserId: userId,
          receiverUserId: 'user123',
          amount: 75.25,
          description: 'Transferência entre contas',
          status: 'pending',
          createdAt: '2025-08-05T09:15:00.000Z'
        }
      ];

      return {
        status: 'success',
        data: mockTransactions,
        totalCount: mockTransactions.length,
        message: 'Lista de transações do usuário recuperada com sucesso'
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'Erro interno do servidor ao buscar as transações do usuário'
      };
    }
  }
}