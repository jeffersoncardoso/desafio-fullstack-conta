
export class PaymentSameAccountError extends Error {
  code = 1;
  message = "Não é possível enviar pagamento para si mesmo";

  constructor() {
    super("Não é possível enviar pagamento para si mesmo");
  }
}