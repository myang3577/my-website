import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import { BlobSvg } from "../components/blob/BlobSvg";
import appStyles from "./App.module.scss";

function App() {
  return (
    <div className={appStyles.app}>
      <BlobSvg />
      <Link to={"warframe"}>
        <Button>Warframe</Button>
      </Link>
    </div>
  );
}

export default App;
