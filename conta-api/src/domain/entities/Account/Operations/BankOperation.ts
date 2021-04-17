import { Account } from "@entities/Account/Account";

export abstract class BankOperation {
  readonly type: string;
  readonly money: number;
  readonly account: Account;

  constructor(account?: Account) {
    if(account)
      this.account = account;
  }
}