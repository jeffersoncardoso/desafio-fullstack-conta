import db from '@database/database';
import { 
  createAccount, listAccounts, deposit, withdraw, paymentTo, 
  listTransactions, getBalance, listAccountsForPayment
} from './fixtures/accountFixture';

describe('AccountController', () => {
  beforeAll(async () => await db.connect());
  afterEach(async () => await db.clear());
  afterAll(async () => await db.close());

  it('GET /account/:id - not found', async (done) => {
    
    const response = (await getBalance("6079d19192f2894b3c546f15"));
    expect(response.status).toBe(500);
    
    done();
  });

  it('GET /account/new - success', async (done) => {
    
    const response = await createAccount({ user: "Jefferson" });
    const account = response.body.account;

    expect(account.balance).toBe(0);
    expect(account.user).toBe("Jefferson");

    done();
  });

  it('GET /accounts - success', async (done) => {
    const account1 = (await createAccount({ user: "Jefferson" })).body.account;
    const account2 = (await createAccount({ user: "Ana" })).body.account;

    const accounts = (await listAccounts()).body;
    expect(accounts.length).toBe(2);
    expect(accounts[0].id).toBe(account1.id);
    expect(accounts[0].user).toBe(account1.user);
    expect(accounts[0].balance).toBe(account1.balance);

    expect(accounts.length).toBe(2);
    expect(accounts[1].id).toBe(account2.id);
    expect(accounts[1].user).toBe(account2.user);
    expect(accounts[1].balance).toBe(account2.balance);

    done();
  });

  it('GET /account/:id/accountsForPayment - success', async (done) => {
    const account1 = (await createAccount({ user: "Jefferson" })).body.account;
    const account2 = (await createAccount({ user: "Ana" })).body.account;
    const account3 = (await createAccount({ user: "Julia" })).body.account;

    const accounts = (await listAccountsForPayment(account1.id)).body;
    expect(accounts.length).toBe(2);
    expect(accounts[0].id).toBe(account2.id);
    expect(accounts[1].id).toBe(account3.id);

    done();
  });

  it('GET /account/:id/deposit - success', async (done) => {
    const account = (await createAccount({ user: "Jefferson" })).body.account;
    
    const event = (await deposit(account.id, { value: 100 })).body.event;

    expect(event).toBeTruthy();
    expect(event.accountId).toBe(account.id);
    expect(event.operation.type).toBe('deposit');
    expect(event.previousBalance).toBe(0);
    expect(event.newBalance).toBe(100);

    done();
  });

  it('GET /account/:id/withdraw - success', async (done) => {
    const account = (await createAccount({ user: "Jefferson" })).body.account;
    await deposit(account.id, { value: 100 });

    const event = (await withdraw(account.id, { value: 75 })).body.event;

    expect(event).toBeTruthy();
    expect(event.accountId).toBe(account.id);
    expect(event.operation.type).toBe('withdraw');
    expect(event.previousBalance).toBe(100);
    expect(event.newBalance).toBe(25);

    done();
  });

  it('GET /account/:id/transactions - success', async (done) => {
    const account = (await createAccount({ user: "Jefferson" })).body.account;
    
    await deposit(account.id, { value: 100 }); //100
    await withdraw(account.id, { value: 20 }); //80
    await deposit(account.id, { value: 30 }); //110
    await withdraw(account.id, { value: 50 }); //60

    const transactions = (await listTransactions(account.id)).body;

    expect(transactions.events).toBeTruthy();
    expect(transactions.events[0].operation).toBeTruthy();
    expect(transactions.events[0].operation.type).toBe('deposit');
    expect(transactions.events[0].previousBalance).toBe(0);
    expect(transactions.events[0].newBalance).toBe(100);

    expect(transactions.events[1].operation).toBeTruthy();
    expect(transactions.events[1].operation.type).toBe('withdraw');
    expect(transactions.events[1].previousBalance).toBe(100);
    expect(transactions.events[1].newBalance).toBe(80);

    expect(transactions.events[2].operation).toBeTruthy();
    expect(transactions.events[2].operation.type).toBe('deposit');
    expect(transactions.events[2].previousBalance).toBe(80);
    expect(transactions.events[2].newBalance).toBe(110);

    expect(transactions.events[3].operation).toBeTruthy();
    expect(transactions.events[3].operation.type).toBe('withdraw');
    expect(transactions.events[3].previousBalance).toBe(110);
    expect(transactions.events[3].newBalance).toBe(60);

    done();
  });

  it('GET /account/:id/balance - success', async (done) => {
    const account = (await createAccount({ user: "Jefferson" })).body.account;
    
    await deposit(account.id, { value: 100.20 }); //100,20
    await withdraw(account.id, { value: 20.40 }); //79,80
    await deposit(account.id, { value: 122.30 }); //202,10
    await withdraw(account.id, { value: 150.80 }); //51,30

    const balance = (await getBalance(account.id)).body.balance;

    expect(balance).toBeTruthy();
    expect(balance).toBe(51.30);

    done();
  });

  it('GET /account/:id/payment/to/:id - success', async (done) => {
    const account1 = (await createAccount({ user: "Julia" })).body.account;
    const account2 = (await createAccount({ user: "Marcelo" })).body.account;
    await deposit(account1.id, { value: 100 });

    const events = (await paymentTo(account1.id, account2.id, { value: 60 })).body.events;
    const account1Balance = await (await getBalance(account1.id)).body.balance;
    const account2Balance = await (await getBalance(account2.id)).body.balance;

    expect(events).toBeTruthy();
    expect(events.length).toBe(2);
    expect(events[0].operation.type).toBe('payment');
    expect(events[1].operation.type).toBe('payment-received');
    expect(account1Balance).toBe(40);
    expect(account2Balance).toBe(60);

    done();
  });

});