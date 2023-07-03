import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { pathOfExileReducer } from "./slices/pathofexile/PathOfExileSlice";
import { teamfightTacticsReducer } from "./slices/teamfighttactics/TeamfightTacticsSlice";
import { warframeReducer } from "./slices/warframe/WarframeSlice";

// Use throughout app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    warframe: warframeReducer,
    pathOfExile: pathOfExileReducer,
    teamfightTactics: teamfightTacticsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
