import { AccountEvent } from '@entities/Account/AccountEvent';
import { ProfitCommand } from '@entities/Account/Commands/ProfitCommand';
import { AccountRepository } from '@repositories/AccountRepository';
import { container } from "tsyringe";

export class ProfitCalculatorService {

  static async execute() : Promise<AccountEvent[]> {
    const repository = new AccountRepository();
    const accounts = await repository.all();
    
    let events: AccountEvent[] = [];
    
    for (const account of accounts) {
      const command = container.resolve(ProfitCommand);
      events = events.concat(await command.execute(account));
    }

    return events;
  }
}