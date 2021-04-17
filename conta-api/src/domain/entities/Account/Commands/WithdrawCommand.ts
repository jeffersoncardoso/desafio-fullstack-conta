import { AccountEventRepository } from "@repositories/AccountEventRepository";
import { AccountRepository } from "@repositories/AccountRepository";
import { AccountEvent } from "@entities/Account/AccountEvent";
import { Account } from "@entities/Account/Account";
import { injectable } from "tsyringe";

@injectable()
export class WithdrawCommand{
  
  constructor(
    private eventRepository: AccountEventRepository,
    private accountRepository: AccountRepository) {

  }
  
  async execute(account: Account, money: number) : Promise<AccountEvent> {
    const withdraw = account.makeWithdraw(money);

    const accountSaved = await this.accountRepository.updateBalance(account, withdraw.account);

    return await this.eventRepository.add(
      accountSaved, 
      withdraw, 
      account.balance, 
      accountSaved.balance
    );
  }
}