import { Controller, Post, Body } from '@nestjs/common';
import { AppService } from '../../app.service';
import { TransactionRequest } from '../dto/transaction-request.dto';
import { TransactionResponse } from '../dto/transaction-response.dto';
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
      // Gerar um ID único para a transação
      const transactionId = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
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
}