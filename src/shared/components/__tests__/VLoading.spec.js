import VLoading from "../VLoading.vue";
import { describe, it } from "vitest";
import { mount } from "@vue/test-utils";

describe("Test VLoading", () => {
  it("should triggerLoading", async () => {
    const wrapper = mount(VLoading, {
      props: {
        isLoading: false,
      },
    });

    expect(wrapper.vm.isLoading).toBe(false);
    expect(wrapper.html()).not.contains("Loading");

    await wrapper.setProps({ isLoading: true });

    expect(wrapper.vm.isLoading).toBe(true);
  });
});
