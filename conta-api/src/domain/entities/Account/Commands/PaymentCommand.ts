import { AccountEventRepository } from "@repositories/AccountEventRepository";
import { AccountRepository } from "@repositories/AccountRepository";
import { Account } from "@entities/Account/Account";
import { AccountEvent } from "@entities/Account/AccountEvent";
import { injectable } from "tsyringe";

@injectable()
export class PaymentCommand{
  
  constructor(
    private eventRepository: AccountEventRepository,
    private accountRepository: AccountRepository
  ) {

  }
  
  async execute(account: Account, money: number, receiver: Account) : Promise<AccountEvent[]> {
    const payment = account.makePayment(money, receiver);
    const paymentReceived = receiver.receivePayment(payment);

    await this.accountRepository.updateBalance(account, payment.account);
    await this.accountRepository.updateBalance(receiver, paymentReceived.account);

    const events = [];
    events.push(
      await this.eventRepository.add(account, payment, account.balance, payment.account.balance)
    );
    events.push(
      await this.eventRepository.add(receiver, paymentReceived, receiver.balance, paymentReceived.account.balance)
    );

    return events;
  }
}