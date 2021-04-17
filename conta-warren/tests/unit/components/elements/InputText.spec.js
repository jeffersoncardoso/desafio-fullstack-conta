import { shallowMount } from '@vue/test-utils';
import InputText from '@/components/elements/InputText.vue';

describe('InputText', () => {

  it('is-number-input', async () => {
    const expectedValue = 1150.30;

    const wrapper = shallowMount(InputText, { 
      propsData: { value: expectedValue }
    });
    
    expect(wrapper.find("input").element.getAttribute("type")).toBe("text");
  });
  
  it('sets-input-with-value-parameter', async () => {
    const expectedValue = 1150.30;

    const wrapper = shallowMount(InputText, { 
      propsData: { value: expectedValue }
    });
    
    expect(wrapper.find("input").element.value).toStrictEqual(String(expectedValue));
  });

  it('sets-emits-event-when-input-changes', async () => {
    const wrapper = shallowMount(InputText, { 
      propsData: { value: 1000 }
    });
    
    wrapper.find("input").setValue(2000);

    expect(wrapper.emitted().input).toBeTruthy();
  });
    
});
