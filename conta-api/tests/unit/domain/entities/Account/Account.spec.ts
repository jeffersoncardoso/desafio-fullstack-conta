import { Account } from "@entities/Account/Account";
import { InsuficientFundsError } from "@entities/Account/Exceptions/InsuficientFundsError";
import { PaymentSameAccountError } from "@entities/Account/Exceptions/PaymentSameAccountError";

describe('Account.SuccessScenarios', () => {
  it('makes-deposit', () => {
    const account = new Account("6079d19192f2894b3c546f13", 0, "Maria");
    
    const deposit = account.makeDeposit(100);

    expect(account.balance).toBe(0);
    expect(deposit.account.balance).toBe(100);
  });

  it('makes-withdraw', () => {
    const account = new Account("6079d19192f2894b3c546f13", 100, "Maria");
    
    const withdraw = account.makeWithdraw(100);
    
    expect(account.balance).toBe(100);
    expect(withdraw.account.balance).toBe(0);
  });

  it('makes-and-receives-payment', () => {
    const account1 = new Account("6079d19192f2894b3c546f13", 100, "Maria");
    const account2 = new Account("6079d19192f2894b3c546f15", 0, "Julio");
    
    const payment = account1.makePayment(25, account2);
    const paymentReceived = account2.receivePayment(payment);
    
    expect(account1.balance).toBe(100);
    expect(account2.balance).toBe(0);

    expect(payment.account.balance).toBe(75);
    expect(paymentReceived.account.balance).toBe(25);
  });

});

describe('Account.ErrorScenarios', () => {
  it('throws-error-withdraw-insuficient-funds', () => {
    const account = new Account("6079d19192f2894b3c546f13", 0, "Maria");
    
    expect(() => { account.makeWithdraw(100); }).toThrow(InsuficientFundsError);
  });

  it('throws-error-payment-insuficient-funds', () => {
    const account1 = new Account("6079d19192f2894b3c546f13", 100, "Maria");
    const account2 = new Account("6079d19192f2894b3c546f15", 0, "Julio");
        
    expect(() => { account1.makePayment(200, account2); }).toThrow(InsuficientFundsError);
  });

  it('throws-error-payment-same-account', () => {
    const account = new Account("6079d19192f2894b3c546f13", 200, "Maria");
    const sameAccount = new Account("6079d19192f2894b3c546f13", 200, "Maria");
    
    expect(() => { account.makePayment(100, sameAccount); }).toThrow(PaymentSameAccountError);
  });
});