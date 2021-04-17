import { mount } from '@vue/test-utils';
import TableTransactions from '@/components/TableTransactions.vue';

describe('TableTransactions', () => {
  
  it('shows-transaction-value-formatted', async () => {
    const transactions = { 
      balance: 70, 
      events: [
        {
          date: '15-04-2021 10:59',
          accountId: '6078a9bb4f6b2c15e8dddd69',
          operation: 'deposit',
          previousBalance: '0',
          newBalance: '100',
        },
        {
          date: '15-04-2021 10:59',
          accountId: '6078a9bb4f6b2c15e8dddd69',
          operation: 'withdraw',
          previousBalance: '100',
          newBalance: '50',
        }
      ]
    };
    
    const account = "6078a9bb4f6b2c15e8dddd69";

    const wrapper = mount(TableTransactions, {
      propsData: { account: account },
      mocks: { 
        $http: { get() { return {data: transactions}; } }
      }
    });

    await wrapper.vm.$nextTick();

    const table = wrapper.findAll("table tbody tr");

    expect(table.exists()).toBeTruthy();
    expect(table.at(0).find('.transaction_value').text()).toContain("+");
    expect(table.at(1).find('.transaction_value').text()).toContain("-");
  });
});
