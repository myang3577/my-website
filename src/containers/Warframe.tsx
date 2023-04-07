import Button from "@mui/joy/Button";

import { fetchExports, selectStatus, selectWarframeExports } from "../slices/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../store";

const Warframe = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectStatus);
  const warframeExports = useAppSelector(selectWarframeExports);

  return (
    <div className="Warframe">
      <Button onClick={() => dispatch(fetchExports())} loading={status === "loading"}>
        Fetch Warframe Exports
      </Button>

      {Object.keys(warframeExports).map((key, i) => (
        <div key={i}>{key}</div>
      ))}
    </div>
  );
};

export default Warframe;
