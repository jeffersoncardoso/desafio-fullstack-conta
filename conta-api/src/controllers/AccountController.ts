import { DepositCommand } from '@entities/Account/Commands/DepositCommand';
import { PaymentCommand } from '@entities/Account/Commands/PaymentCommand';
import { WithdrawCommand } from '@entities/Account/Commands/WithdrawCommand';
import { AccountEventRepository } from '@repositories/AccountEventRepository';
import { AccountRepository } from '@repositories/AccountRepository';
import { Request, Response } from 'express';
import { container } from "tsyringe";

class AccountController
{
  async accounts(req: Request, res: Response) {
    try {
      const accountRepository = container.resolve(AccountRepository);
      const accounts = await accountRepository.all();
      
      AccountController.sendResponse(res, accounts);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  async new(req: Request, res: Response) {
    try {
      const accountRepository = container.resolve(AccountRepository);
      const account = await accountRepository.new(String(req.query.user));

      AccountController.sendResponse(res, { account: account });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  async deposit(req: Request, res: Response) {
    try {
      const accountRepository = container.resolve(AccountRepository);
      const account = await accountRepository.get(req.params.id);

      const depositCommand = container.resolve(DepositCommand);
      const event = await depositCommand.execute(account, Number(req.query.value)); 

      AccountController.sendResponse(res, { event: event });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  async withdraw(req: Request, res: Response) {
    try {
      const accountRepository = container.resolve(AccountRepository);
      const account = await accountRepository.get(req.params.id);

      const withdrawCommand = container.resolve(WithdrawCommand);
      const event = await withdrawCommand.execute(account, Number(req.query.value));

      AccountController.sendResponse(res, { event: event });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  async payment(req: Request, res: Response) {
    try{
      const accountRepository = container.resolve(AccountRepository);
      const account = await accountRepository.get(req.params.id);
      const receiver = await accountRepository.get(req.params.receiver);

      const paymentCommand = container.resolve(PaymentCommand);
      const events = await paymentCommand.execute(account, Number(req.query.value), receiver);

      AccountController.sendResponse(res, { events: events });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  async transactions(req: Request, res: Response) {
    try {
      const accountRepository = container.resolve(AccountRepository);
      const account = await accountRepository.get(req.params.id);

      const eventsRepository = container.resolve(AccountEventRepository);
      const events = await eventsRepository.get(account);
      
      AccountController.sendResponse(res, { balance: account.balance, events: events });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  async balance(req: Request, res: Response) {
    try {
      const accountRepository = container.resolve(AccountRepository);
      const account = await accountRepository.get(req.params.id);
      
      AccountController.sendResponse(res, { balance: account.balance });
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  async accountsForPayment(req: Request, res: Response) {
    try {
      const accountRepository = container.resolve(AccountRepository);
      let accounts = await accountRepository.all();
      accounts = accounts.filter(account => account.id != req.params.id);
      
      AccountController.sendResponse(res, accounts);
    } catch (error) {
      res.status(500).send({ error: error });
    }
  }

  static sendResponse(res: Response, data: any) : Response {
    return res.send(data);
  }
}

export default new AccountController();