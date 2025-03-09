import { configureStore } from "@reduxjs/toolkit";
import planSlice from "./features/plan/plan-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      plans: planSlice,
    },
  });
}

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<AppStore["getState"]>;