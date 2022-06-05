import { fireEvent, render, screen } from "@testing-library/react";

import { Refresh } from "../../components/Refresh";

describe("<Refresh />", () => {
  it("increases scale on click", () => {
    const { container } = render(<Refresh />);

    fireEvent.click(container);
  });
});
