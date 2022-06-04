import renderer from "react-test-renderer";

import { Refresh } from "../../components/Refresh";

describe("<Refresh />", () => {
  it("renders correctly", () => {
    const tree = renderer.create(<Refresh />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
