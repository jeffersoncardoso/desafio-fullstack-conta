import Vue from 'vue';

Vue.component('input-text', require('@/components/elements/InputText').default);
Vue.component('input-money', require('@/components/elements/InputMoney').default);

Vue.component('money', require('@/components/elements/TextMoney').default);
Vue.component('btn-deposit', require('@/components/elements/ButtonDeposit').default);
Vue.component('btn-withdraw', require('@/components/elements/ButtonWithdraw').default);
Vue.component('btn-payment', require('@/components/elements/ButtonPayment').default);
Vue.component('btn-create-account', require('@/components/elements/ButtonCreateAccount').default);
Vue.component('btn-back', require('@/components/elements/ButtonBack').default);

Vue.component('select-account', require('@/components/elements/SelectAccount').default);
Vue.component('account-summary', require('@/components/AccountSummary').default);
Vue.component('table-transactions', require('@/components/TableTransactions').default);

import { faEdit, faFileAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
library.add(faEdit, faFileAlt, faPlus);
Vue.component('fa', FontAwesomeIcon);
