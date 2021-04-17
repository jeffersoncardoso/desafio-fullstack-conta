import { BankOperation } from "@entities/Account/Operations/BankOperation";
import { Account } from "@entities/Account/Account";

export class Payment extends BankOperation{
    
  readonly type: string = "payment";

  constructor(account: Account, readonly receiver: Account, readonly money: number) {
    super(account);
  }
}