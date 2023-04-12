import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import { BlobSvg } from "../components/blob/BlobSvg";

function App() {
  return (
    <Paper>
      <BlobSvg />
      <Link to={"warframe"}>
        <Button>Warframe</Button>
      </Link>
    </Paper>
  );
}

export default App;
