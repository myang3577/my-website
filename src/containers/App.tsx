import "./App.css";

import { BlobSvg } from "../components/blob/BlobSvg";
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
        <BlobSvg />
      </header>
    </div>
  );
};

export default App;
