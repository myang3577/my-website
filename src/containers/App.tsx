import "./App.css";

import { Blob } from "../components/BlobSvg";
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
        <Blob />
      </header>
    </div>
  );
};

export default App;
