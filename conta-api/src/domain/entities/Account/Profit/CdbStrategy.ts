import { Account } from "@entities/Account/Account";
import { Money } from "@entities/Account/Money";
import { Profit } from "@entities/Account/Operations/Profit";
import { ProfitStrategy } from "@entities/Account/Profit/ProfitStrategy";

const PERCENTAGE = 0.005; //0.5%

export class CdbStrategy extends ProfitStrategy
{
  applies(account: Account) : boolean {
    return account.balance > 0;
  }

  calculate(account: Account) : Profit {
    const profit = Money.mult(account.balance, PERCENTAGE);
    return new Profit(profit, this.getName());
  }
  
  getName() : string {
    return "Rendimento";
  }
}