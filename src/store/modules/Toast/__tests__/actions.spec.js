import { vi, describe, expect } from "vitest";

import actions from "../actions";

describe("actions", () => {
  it("toggleToast", () => {
    const context = {
      commit: vi.fn(),
    };

    actions.toggleToast(context);

    expect(context.commit).toHaveBeenCalled();
  });
});
