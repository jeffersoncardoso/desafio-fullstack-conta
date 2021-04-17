import { AccountRepository } from "@repositories/AccountRepository";
import { AccountEventRepository } from "@repositories/AccountEventRepository";
import { Account } from "@entities/Account/Account";
import { AccountEvent } from "@entities/Account/AccountEvent";
import { injectable } from "tsyringe";

@injectable()
export class DepositCommand{
  constructor(
    private eventRepository: AccountEventRepository,
    private accountRepository: AccountRepository) {

  }
  
  async execute(account: Account, money: number) : Promise<AccountEvent> {
    const deposit = account.makeDeposit(money);

    const accountSaved = await this.accountRepository.updateBalance(account, deposit.account);

    return await this.eventRepository.add(
      accountSaved, 
      deposit, 
      account.balance, 
      accountSaved.balance
    );
  }
}