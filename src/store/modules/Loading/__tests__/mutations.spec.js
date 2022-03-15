import mutations from "../mutations";
import { describe, it, expect } from "vitest";

describe("mutations", () => {
  it("updateLoading", () => {
    const state = {
      isLoading: false,
    };

    mutations.updateLoading(state, true);
    expect(state).toEqual({ isLoading: true });
  });
});
