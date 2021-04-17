import { Account } from "@entities/Account/Account";
import { Profit } from "@entities/Account/Operations/Profit";

export abstract class ProfitStrategy{
  abstract applies(account: Account) : boolean;
  abstract calculate(account: Account) : Profit;
  abstract getName() : string;
}