import logo from "./logo.svg";
import { Counter } from "./containers/Counter";
import "./App.css";
import { Refresh } from "./components/Refresh";

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
