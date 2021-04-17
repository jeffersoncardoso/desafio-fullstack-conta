import { shallowMount } from '@vue/test-utils';
import ButtonCreateAccount from '@/components/elements/ButtonCreateAccount.vue';

describe('ButtonCreateAccount', () => {

  it('clicks-on-button', async () => {
    const wrapper = shallowMount(ButtonCreateAccount, {});
    wrapper.find('button').trigger("click");    
    
    expect(wrapper.find('button').text()).toBe("Criar Conta");
    expect(wrapper.emitted().click).toBeTruthy();
  });
    
});
