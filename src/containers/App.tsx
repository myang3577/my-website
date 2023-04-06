import { domMax, LazyMotion } from "framer-motion";

import { BlobSvg } from "../components/blob/BlobSvg";

function App() {
  return (
    <LazyMotion features={domMax}>
      <div className="App">
        <BlobSvg />
      </div>
    </LazyMotion>
  );
}

export default App;
