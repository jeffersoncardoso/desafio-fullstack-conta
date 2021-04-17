import { shallowMount } from '@vue/test-utils';
import ButtonDeposit from '@/components/elements/ButtonDeposit.vue';

describe('ButtonDeposit', () => {

  it('clicks-on-button', async () => {
    const wrapper = shallowMount(ButtonDeposit, {});
    wrapper.find('button').trigger("click");    
    
    expect(wrapper.find('button').text()).toBe("Depositar");
    expect(wrapper.emitted().click).toBeTruthy();
  });
    
});
