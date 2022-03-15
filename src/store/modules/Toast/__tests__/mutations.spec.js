import mutations from "../mutations";

describe("mutations", () => {
  it("showToast", () => {
    const state = {
      show: false,
      type: "",
      message: "",
    };

    mutations.showToast(state, {
      show: true,
      type: "success",
      message: "Success",
    });

    expect(state).toEqual({
      show: true,
      type: "success",
      message: "Success",
    });
  });

  it("hideToast", () => {
    const state = {
      show: true,
      type: "success",
      message: "Success",
    };

    mutations.hideToast(state);

    expect(state).toEqual({
      show: false,
      type: "",
      message: "",
    });
  });
});
