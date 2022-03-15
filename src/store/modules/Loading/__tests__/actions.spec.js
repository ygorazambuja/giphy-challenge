import { vi, describe, it } from "vitest";
import actions from "../actions";

describe("actions", () => {
  it("toggleLoading", () => {
    const context = {
      commit: vi.fn(),
    };

    actions.toggleLoading(context);

    expect(context.commit).toHaveBeenCalled();
  });
});
