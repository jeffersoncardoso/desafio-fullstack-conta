import "reflect-metadata";
import { ProfitCommand } from "@entities/Account/Commands/ProfitCommand";
import { AccountEventRepository } from "@repositories/AccountEventRepository";
import { AccountRepository } from "@repositories/AccountRepository";
import db from '@database/database';

describe('ProfitCommand', () => {

  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());

  it('adds-profit-to-account', async (done) => {
    const accountRepository = new AccountRepository();
    const eventRepository = new AccountEventRepository();

    let account = await accountRepository.new("Ana");
    account = await accountRepository.addToBalance(account, 100);

    const command = new ProfitCommand(accountRepository, eventRepository);
    const events = await command.execute(account);
    
    expect(events.length).toBe(1);
    expect(events[0].operation.type).toBe('profit');
    expect(events[0].previousBalance).toBe(100);
    expect(events[0].newBalance).toBe(100 + (100 * 0.005));

    done();
  });

  it('not-adds-profit-to-account', async (done) => {
    const accountRepository = new AccountRepository();
    const eventRepository = new AccountEventRepository();

    let account = await accountRepository.new("Ana");
    account = await accountRepository.addToBalance(account, 0);

    const command = new ProfitCommand(accountRepository, eventRepository);
    const events = await command.execute(account);
    
    expect(events.length).toBe(0);

    done();
  });
});