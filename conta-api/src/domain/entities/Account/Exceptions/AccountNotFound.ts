
export class AccountNotFound extends Error {
  code = 1;
  message = "Conta não encontrada";

  constructor() {
    super("Conta não encontrada");
  }
}