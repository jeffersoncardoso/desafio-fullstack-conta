import { BankOperation } from "@entities/Account/Operations/BankOperation";
import { Account } from "@entities/Account/Account";

export class Withdraw extends BankOperation {
    
  readonly type: string = "withdraw";

  constructor(account: Account, readonly money: number) {
    super(account);
  }
} 