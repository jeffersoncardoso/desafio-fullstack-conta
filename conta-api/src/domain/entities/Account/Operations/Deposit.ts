import { BankOperation } from "@entities/Account/Operations/BankOperation";
import { Account } from "@entities/Account/Account";

export class Deposit extends BankOperation{
  
  readonly type: string = "deposit";
  
  constructor(account: Account, readonly money: number) {
    super(account);
  }
}