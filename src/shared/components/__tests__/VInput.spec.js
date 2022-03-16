import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import VInput from "../VInput.vue";

describe("VInput", () => {
  it("should render with props", () => {
    const wrapper = mount(VInput, {
      props: {
        label: "test",
        modelValue: "QWERTY",
      },
    });

    expect(wrapper.html()).toContain("test");

    const elementValue = wrapper.find("input").element.value;
    expect(elementValue).toBe("QWERTY");
  });

  it("should render disabled", () => {
    const wrapper = mount(VInput, {
      props: {
        label: "test",
        modelValue: "QWERTY",
        disabled: true,
      },
    });

    expect(wrapper.find("input").element.disabled).toBe(true);
  });
});
