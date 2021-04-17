
export class InsuficientFundsError extends Error {
  code = 1;
  message = "Saldo insuficiente";
  
  constructor() {
    super("Saldo insuficiente");
  }
}