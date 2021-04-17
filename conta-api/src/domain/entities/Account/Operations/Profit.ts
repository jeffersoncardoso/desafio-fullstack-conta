import { BankOperation } from "@entities/Account/Operations/BankOperation";

export class Profit extends BankOperation {
    
  readonly type: string = "profit";

  constructor(readonly money: number, readonly name: string) {
    super();
  }
} 