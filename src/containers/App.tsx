import "./App.css";

import { Refresh } from "../components/Refresh";
import { Counter } from "../containers/Counter";
import logo from "../logo.svg";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <Refresh />
      </header>
    </div>
  );
};

export default App;
