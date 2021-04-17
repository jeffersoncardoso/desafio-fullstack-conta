import { AccountRepository } from "@repositories/AccountRepository";
import { AccountEventRepository } from "@repositories/AccountEventRepository";
import { CdbStrategy } from "@entities/Account/Profit/CdbStrategy";
import { Account } from "@entities/Account/Account";
import { AccountEvent } from "@entities/Account/AccountEvent";
import { injectable } from "tsyringe";

@injectable()
export class ProfitCommand{

  private strategies = [
    CdbStrategy
  ];
  
  constructor(
    private accountRepository: AccountRepository,
    private eventRepository: AccountEventRepository) {

  }
  
  async execute(account: Account) : Promise<AccountEvent[]> {
    const strategies = this.strategies.map(strategy => new strategy());

    const events = [];
    let event: AccountEvent;

    for (const strategy of strategies) {
      const profit = account.addProfit(strategy);

      if(profit) {
        const acountSaved = await this.accountRepository.addToBalance(account, profit.money);
        event = await this.eventRepository.add(account, profit, account.balance, acountSaved.balance);
        events.push(event);
      }
    }

    return events;
  }
}