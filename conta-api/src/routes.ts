import { Router } from "express";
import accountController from '@controllers/AccountController';

const router = Router();

router.get('/', (req, res) => {
  res.send("Bem-vindo(a) API de Conta Warren");
});
router.get('/accounts', accountController.accounts);
router.get('/account/new', accountController.new); 
router.get('/account/:id/deposit', accountController.deposit);
router.get('/account/:id/withdraw', accountController.withdraw);
router.get('/account/:id/payment/to/:receiver', accountController.payment);
router.get('/account/:id/transactions', accountController.transactions);
router.get('/account/:id/balance', accountController.balance);
router.get('/account/:id/accountsForPayment', accountController.accountsForPayment);

export { router };