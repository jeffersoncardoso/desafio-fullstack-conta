import { mount } from '@vue/test-utils';
import TextMoney from '@/components/elements/TextMoney.vue';

describe('TextMoney', () => {
  it('shows-number-formatted', async () => {
    const value = 150000.75;
    const expectedCurrency = "R$";
    const expectedValue = "150,000.75";

    const wrapper = mount(TextMoney, {
      propsData: { value: value },
    });
    
    expect(wrapper.text()).toContain(expectedCurrency);
    expect(wrapper.text()).toContain(expectedValue);
  });
});
