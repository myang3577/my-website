import Button from "@mui/joy/Button";
import { Link } from "react-router-dom";

import { BlobSvg } from "../components/blob/BlobSvg";

function App() {
  return (
    <div className="App">
      <BlobSvg />
      <Link to={"warframe"}>
        <Button>Warframe</Button>
      </Link>
    </div>
  );
}

export default App;
