import { BankOperation } from "@entities/Account/Operations/BankOperation";

export class AccountEvent {
  constructor(
    readonly date: string,
    readonly accountId: string,
    readonly operation: BankOperation,
    readonly previousBalance: number,
    readonly newBalance: number
  ) {

  }
}