import { configureStore } from "@reduxjs/toolkit";
import workflowsReducer from "./workflowsSlice";

export const store = configureStore({
  reducer: {
    workflows: workflowsReducer,
  },
});
