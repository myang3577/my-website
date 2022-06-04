import { Provider } from "react-redux";
import renderer from "react-test-renderer";

import App from "../../containers/App";
import { store } from "../../store";

describe("<App />", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <App />
        </Provider>
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
