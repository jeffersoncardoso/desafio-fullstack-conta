import { shallowMount } from '@vue/test-utils';
import SelectAccount from '@/components/elements/SelectAccount.vue';

describe('SelectAccount', () => {

  it('selects-first-account-as-default', async () => {

    const accounts = [
      { id: '6078a9bb4f6b2c15e8dd0501', user: 'Maria' },
      { id: '6078a9bb4f6b2c15e8dd0503', user: 'Julio' },
      { id: '6078a9bb4f6b2c15e8dd0504', user: 'Fernanda' },
    ];

    const wrapper = shallowMount(SelectAccount, {
      mocks: { $http: { get() { return {data: accounts}; } } }
    });

    await wrapper.vm.$nextTick();

    const selectedText = accounts[0].user + " - Conta Nº ***" + accounts[0].id.slice(-4);
    expect(wrapper.find('option:checked').text()).toBe(selectedText);

  });

  it('selects-account-passed-as-parameter', async () => {

    const accounts = [
      { id: '6078a9bb4f6b2c15e8dd0501', user: 'Maria' },
      { id: '6078a9bb4f6b2c15e8dd0503', user: 'Julio' },
      { id: '6078a9bb4f6b2c15e8dd0504', user: 'Fernanda' },
    ];

    const wrapper = shallowMount(SelectAccount, {
      propsData: { defaultAccount: accounts[1].id },
      mocks: { $http: { get() { return {data: accounts}; } } }
    });

    await wrapper.vm.$nextTick();

    expect(wrapper.find('option:checked').text()).toContain(accounts[1].user);
  });

  it('emits-event-when-selection-changes', async () => {

    const accounts = [
      { id: '6078a9bb4f6b2c15e8dd0501', user: 'Maria' },
      { id: '6078a9bb4f6b2c15e8dd0503', user: 'Julio' },
      { id: '6078a9bb4f6b2c15e8dd0504', user: 'Fernanda' },
    ];

    const wrapper = shallowMount(SelectAccount, {
      mocks: { $http: { get() { return {data: accounts}; } } }
    });

    await wrapper.vm.$nextTick();

    const options = wrapper.find('select').findAll('option');
    await options.at(1).setSelected();
    expect(wrapper.emitted().selected[1]).toStrictEqual([accounts[1]]);
  });
});
