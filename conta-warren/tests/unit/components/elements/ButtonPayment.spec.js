import { shallowMount } from '@vue/test-utils';
import ButtonWithdraw from '@/components/elements/ButtonWithdraw.vue';

describe('ButtonWithdraw', () => {

  it('clicks-on-button', async () => {
    const wrapper = shallowMount(ButtonWithdraw, {});
    wrapper.find('button').trigger("click");    
    
    expect(wrapper.find('button').text()).toBe("Resgatar");
    expect(wrapper.emitted().click).toBeTruthy();
  });
    
});
