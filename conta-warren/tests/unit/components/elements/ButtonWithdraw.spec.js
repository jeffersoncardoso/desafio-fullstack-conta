import { shallowMount } from '@vue/test-utils';
import ButtonPayment from '@/components/elements/ButtonPayment.vue';

describe('ButtonPayment', () => {

  it('clicks-on-button', async () => {
    const wrapper = shallowMount(ButtonPayment, {});
    wrapper.find('button').trigger("click");    
    
    expect(wrapper.find('button').text()).toBe("Pagar");
    expect(wrapper.emitted().click).toBeTruthy();
  });
    
});
