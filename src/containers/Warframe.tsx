import Button from "@mui/joy/Button";

import { LOADING_STATE } from "../constants/Constants";
import { fetchExports, selectWarframeExports, selectWarframeExportStatus } from "../slices/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../store";

const Warframe = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectWarframeExportStatus);
  const warframeExports = useAppSelector(selectWarframeExports);

  return (
    <div className="Warframe">
      <Button onClick={() => dispatch(fetchExports())} loading={status === LOADING_STATE.LOADING}>
        Fetch Warframe Exports
      </Button>

      {Object.keys(warframeExports).map((key, i) => (
        <div key={i}>{key}</div>
      ))}
    </div>
  );
};

export default Warframe;
