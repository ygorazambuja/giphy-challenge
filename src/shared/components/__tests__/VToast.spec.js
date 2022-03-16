import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import VToast from "../VToast.vue";
describe("VToast", () => {
  it("should render success toast", () => {
    const wrapper = mount(VToast, {
      props: {
        type: "success",
        message: "Success",
        show: true,
      },
    });

    const toastContainer = wrapper.find(".toast");
    expect(toastContainer.exists()).toBe(true);
    const toastMessageContainer = wrapper.find(".positive");
    expect(toastMessageContainer.exists()).toBe(true);
  });

  it("should render error toast", () => {
    const wrapper = mount(VToast, {
      props: {
        type: "error",
        message: "Error",
        show: true,
      },
    });

    const toastContainer = wrapper.find(".toast");
    expect(toastContainer.exists()).toBe(true);
    const toastMessageContainer = wrapper.find(".negative");
    expect(toastMessageContainer.exists()).toBe(true);
  });

  it("should render toast with correct message", () => {
    const wrapper = mount(VToast, {
      props: {
        type: "success",
        message: "Success",
        show: true,
      },
    });
    const toastMessageContainer = wrapper.find(".positive");
    expect(toastMessageContainer.text()).toBe("Success");
  });

  it("should toast be invisible", () => {
    const wrapper = mount(VToast, {
      props: {
        type: "success",
        message: "Success",
        show: false,
      },
    });
    const toastContainer = wrapper.find(".toast");
    expect(toastContainer.exists()).toBe(false);
  });
});
