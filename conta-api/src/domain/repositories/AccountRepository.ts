import { Account } from "@entities/Account/Account";
import { injectable } from "tsyringe";
import AccountModel from "@schemas/mongodb/AccountModel";
import { AccountNotFound } from "@entities/Account/Exceptions/AccountNotFound";

@injectable()
export class AccountRepository {

  async new(user: string) : Promise<Account> {
    const newAccount:any = await AccountModel.create({ user: user, balance: 0 });
    return this.get(newAccount._id);
  }

  async all() : Promise<Account[]> {
    const accounts = (await AccountModel.find()).map((item:any) => {
      return new Account(item._id, item.balance, item.user);
    });
    
    return accounts;
  }

  async get(id: string) : Promise<Account> {
    const account:any = await AccountModel.findOne({ _id: id });
    
    if(!account)
      throw new AccountNotFound();

    return new Account(account._id, account.balance, account.user);
  }

  async addToBalance(account: Account, value: number) : Promise<Account> {
    await AccountModel.updateOne({ _id: account.id }, { balance: account.balance + value });
    return await this.get(account.id);
  }

  async updateBalance(oldAccount: Account, account: Account) : Promise<Account> {
    await AccountModel.updateOne({ _id: account.id }, { balance: account.balance });
    return await this.get(account.id);
  }
}
