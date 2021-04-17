import { Money } from "@entities/Account/Money";

describe('Money', () => {
  it('sum-two-integer-numbers', () => {
    expect(Money.sum(30, 70)).toBe(100);
  });

  it('sub-two-integer-numbers', () => {
    expect(Money.sub(70, 30)).toBe(40);
  });

  it('sum-two-float-numbers-with-two-decimal-places', () => {
    expect(Money.sum(10.30, 7.50)).toBe(17.80);
  });

  it('sub-two-float-numbers-with-two-decimal-places', () => {
    expect(Money.sub(9.35, 7.56)).toBe(1.79);
  });

  it('round-numbers-using-two-decimal-places', () => {
    expect(Money.sum(80.3532, 75.4821)).toBe(155.84);
    expect(Money.sub(80.3532, 75.4821)).toBe(4.87);
  });
});