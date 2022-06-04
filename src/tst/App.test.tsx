import { Provider } from "react-redux";
import { store } from "../app/store";
import App from "../App";
import renderer from "react-test-renderer";

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
