import { Account } from "@entities/Account/Account";
import { AccountEvent } from "@entities/Account/AccountEvent";
import { BankOperation } from "@entities/Account/Operations/BankOperation";
import AccountEventModel from "@schemas/mongodb/AccountEventModel";
import { injectable } from "tsyringe";

@injectable()
export class AccountEventRepository {
  
  private events: AccountEvent[] = [];

  async add(account: Account, operation: BankOperation, currentBalance, newBalance) : Promise<AccountEvent> {
    const event = new AccountEvent(
      (new Date().toISOString()), 
      account.id, 
      operation, 
      currentBalance, 
      newBalance
    );
    
    await AccountEventModel.create({...event});

    return event;
  }

  async get(account: Account) : Promise<AccountEvent[]> {
    const events = await AccountEventModel.find({ accountId: account.id });

    return events.map((event) => {
      return new AccountEvent(
        event.date, 
        event.accountId, 
        event.operation, 
        event.previousBalance, 
        event.newBalance
      );
    });
  }
}
