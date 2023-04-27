import { Button, Paper } from "@mui/material";
import { Link } from "react-router-dom";

import { BlobSvg } from "./blob/BlobSvg";

function Homepage() {
  return (
    <Paper>
      <BlobSvg />
      <Link to={"warframe"}>
        <Button>Warframe</Button>
      </Link>
      <Link to={"pathofexile"}>
        <Button>Path of Exile</Button>
      </Link>
    </Paper>
  );
}

export default Homepage;
