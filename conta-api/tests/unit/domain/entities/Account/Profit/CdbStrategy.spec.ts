import { Account } from "@entities/Account/Account";
import { CdbStrategy } from "@entities/Account/Profit/CdbStrategy";

describe('CdbStrategy', () => {
  it('does-not-apply-when-balance-is-zero', () => {
    const account = new Account("6079d19192f2894b3c546f13", 0, "Maria");
    const strategy = new CdbStrategy();

    strategy.applies(account);

    expect(strategy.applies(account)).toBeFalsy();
  });

  it('applies-when-balance-is-greater-than-zero', () => {
    const account = new Account("6079d19192f2894b3c546f13", 100, "Maria");
    const strategy = new CdbStrategy();

    strategy.applies(account);

    expect(strategy.applies(account)).toBeTruthy();
  });

  it('calculates-profit', () => {
    const account = new Account("6079d19192f2894b3c546f13", 100, "Maria");
    const strategy = new CdbStrategy();

    const profit = strategy.calculate(account);

    expect(profit.money).toBe(0.5);  
  });

  it('calculates-profit-from-account', () => {
    const account = new Account("6079d19192f2894b3c546f13", 100, "Maria");
    const profit = account.addProfit(new CdbStrategy());

    expect(profit.money).toBe(0.5);  
  });

  it('does-not-calculate-profit-from-account-when-not-applies', () => {
    const account = new Account("6079d19192f2894b3c546f13", 0, "Maria");
    const profit = account.addProfit(new CdbStrategy());

    expect(profit).toBeFalsy();
  });
});