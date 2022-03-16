import { mount } from "@vue/test-utils";
import { vi, it, describe, expect } from "vitest";

import VSideBar from "../VSideBar.vue";

describe("VSidebar Component", () => {
  it("onClose VSidebar", async () => {
    const mockFn = vi.fn();
    const wrapper = mount(VSideBar, {
      props: {
        open: true,
        onClose: mockFn,
      },
    });

    await wrapper.vm.onClose();
    expect(mockFn).toHaveBeenCalled();

    await wrapper.setProps({
      open: false,
    });

    expect(wrapper.classes()).not.toContain("visible");
  });
});
