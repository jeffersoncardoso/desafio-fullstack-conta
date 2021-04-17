import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import Deposit from '@/views/Deposit.vue';
import Withdraw from '@/views/Withdraw.vue';
import Payment from '@/views/Payment.vue';
import Statement from '@/views/Statement.vue';
import CreateAccount from '@/views/CreateAccount.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account/create',
    name: 'CreateAccount',
    component: CreateAccount
  },
  {
    path: '/account/:id/deposit',
    name: 'Deposit',
    component: Deposit
  },
  {
    path: '/account/:id/withdraw',
    name: 'Withdraw',
    component: Withdraw
  },
  {
    path: '/account/:id/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/account/:id/statement',
    name: 'Statement',
    component: Statement
  },
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
