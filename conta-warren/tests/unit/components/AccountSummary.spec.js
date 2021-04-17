import { mount } from '@vue/test-utils';
import AccountSummary from '@/components/AccountSummary.vue';

describe('AccountSummary', () => {
  it('renders-account-summary', async () => {

    const expectedBalance = 100;
    const response = { data: { balance: expectedBalance } };
    const account = "6078a9bb4f6b2c15e8dddd69";

    const wrapper = mount(AccountSummary, {
      propsData: { account: account, autoUpdate: false },
      mocks: { $http: { get() { return response; } } }
    });

    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain("Saldo disponível");
    expect(wrapper.text()).toContain("100.00");
  });

  it('emits-statement-event', async () => {
    const expectedBalance = 0;
    const response = { data: { balance: expectedBalance } };
    const account = "6078a9bb4f6b2c15e8dddd69";

    const wrapper = mount(AccountSummary, {
      propsData: { account: account, autoUpdate: false },
      mocks: { $http: { get() { return response; } } }
    });

    await wrapper.vm.$nextTick();
    wrapper.find(".btn-statement").trigger("click");

    expect(wrapper.emitted().statement).toBeTruthy();
  });
});
