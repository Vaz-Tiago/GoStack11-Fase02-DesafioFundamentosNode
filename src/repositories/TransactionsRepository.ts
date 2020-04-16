import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomeFilter = this.transactions.filter(
      transaction => transaction.type === 'income',
    );

    const income = incomeFilter.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

    const outcomeFilter = this.transactions.filter(
      transaction => transaction.type === 'outcome',
    );

    const outcome = outcomeFilter.reduce((total, transaction) => {
      return total + transaction.value;
    }, 0);

    const total = income - outcome;

    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
