import { mount } from "@vue/test-utils";
import { vi, describe } from "vitest";

import VButton from "../VButton.vue";
describe("VButton", () => {
  it("Should render the slot correctly", () => {
    const wrapper = mount(VButton, {
      slots: {
        default: "Hello World",
      },
    });

    expect(wrapper.text()).toBe("Hello World");
  });

  it("Should render a Primary Button", () => {
    const wrapper = mount(VButton, {
      propsData: {
        type: "primary",
      },
    });

    expect(wrapper.classes()).toContain("primary");
  });

  it("Should render a Secondary Button", () => {
    const wrapper = mount(VButton, {
      propsData: {
        type: "secondary",
      },
    });

    expect(wrapper.classes()).toContain("secondary");
  });

  it("Should render a Success Button", () => {
    const wrapper = mount(VButton, {
      propsData: {
        type: "success",
      },
    });

    expect(wrapper.classes()).toContain("green");
  });

  it("Should trigger button", async () => {
    const mockFn = vi.fn();

    const wrapper = mount(VButton, {
      props: {
        type: "primary",
        onClick: mockFn,
      },
      slots: {
        default: "Hello World",
      },
    });

    await wrapper.vm.onClick();
    expect(mockFn).toHaveBeenCalled();
  });
});
