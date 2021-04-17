import { PaymentSameAccountError } from "@entities/Account/Exceptions/PaymentSameAccountError";
import { InsuficientFundsError } from "@entities/Account/Exceptions/InsuficientFundsError";
import { Deposit } from "@entities/Account/Operations/Deposit";
import { Payment } from "@entities/Account/Operations/Payment";
import { PaymentReceived } from "@entities/Account/Operations/PaymentReceived";
import { Profit } from "@entities/Account/Operations/Profit";
import { Withdraw } from "@entities/Account/Operations/Withdraw";
import { ProfitStrategy } from "@entities/Account/Profit/ProfitStrategy";
import { Money } from "@entities/Account/Money";

export class Account {
  readonly id:string;
  readonly balance:number;
  readonly user: string;

  constructor(id:string, balance:number, user: string) {
    this.id = id;
    this.balance = balance;
    this.user = user;
  }

  makeDeposit(value: number) : Deposit{
    const balance = Money.sum(this.balance, value);
    const deposit = new Deposit(
      new Account(this.id, balance, this.user), 
      value
    );

    return deposit;
  }

  makeWithdraw(value: number) : Withdraw {
    const balance = Money.sub(this.balance, value);
    
    if(balance < 0)
      throw new InsuficientFundsError();
      
    const withdraw = new Withdraw(
      new Account(this.id, balance, this.user), 
      value
    );

    return withdraw;
  }

  makePayment(value: number, receiver: Account) : Payment {
    if(this.id == receiver.id)
      throw new PaymentSameAccountError();

    const balance = Money.sub(this.balance, value);

    if(balance < 0)
      throw new InsuficientFundsError();

    const payment = new Payment(
      new Account(this.id, balance, this.user), 
      receiver, 
      value
    );

    return payment;
  }

  receivePayment(payment: Payment) : PaymentReceived {
    const balance = this.balance + payment.money;
    const paymentReceived = new PaymentReceived(
      new Account(this.id, balance, this.user), 
      payment.receiver, 
      payment.money
    );

    return paymentReceived;
  }

  addProfit(strategy: ProfitStrategy) : Profit {
    if(!strategy.applies(this)) return;
    
    return strategy.calculate(this);
  }
}
