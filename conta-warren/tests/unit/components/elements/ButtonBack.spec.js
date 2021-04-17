import { shallowMount } from '@vue/test-utils';
import ButtonBack from '@/components/elements/ButtonBack.vue';

describe('ButtonBack', () => {

  it('clicks-on-button', async () => {
    const wrapper = shallowMount(ButtonBack, {});
    wrapper.find('button').trigger("click");    
    
    expect(wrapper.find('button').text()).toBe("Voltar");
    expect(wrapper.emitted().click).toBeTruthy();
  });
    
});
