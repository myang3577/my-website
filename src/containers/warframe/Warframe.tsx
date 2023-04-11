import { LoadingButton } from "@mui/lab";
import { Paper } from "@mui/material";

import { LOADING_STATE } from "../../constants/Constants";
import { fetchExports, selectWarframeExports, selectWarframeExportStatus } from "../../slices/WarframeSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import warframeStyles from "./Warframe.module.scss";

const Warframe = () => {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectWarframeExportStatus);
  const warframeExports = useAppSelector(selectWarframeExports);

  return (
    <Paper className={warframeStyles.warframe} elevation={0}>
      <Paper>
        <LoadingButton
          onClick={() => dispatch(fetchExports())}
          loading={status === LOADING_STATE.LOADING}
          variant="contained"
        >
          Fetch Warframe Exports
        </LoadingButton>
        {Object.keys(warframeExports).map((key, i) => (
          <div key={i}>{key}</div>
        ))}
      </Paper>
    </Paper>
  );
};

export default Warframe;
