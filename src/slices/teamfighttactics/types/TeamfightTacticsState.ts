import { LOADING_STATE } from "../../../constants/Constants";
import { TftMetasrc } from "./TftMetasrc";

export interface TeamfightTacticsState {
  tftMetasrcDataStatus: LOADING_STATE;
  tftMetasrcData: TftMetasrc[];
}
