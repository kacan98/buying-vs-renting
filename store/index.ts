import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { buyingSlice } from "./calculatorSlices/buying.ts";
import { futurePredictionsSlice } from "./calculatorSlices/futurePreditions.ts";
import { rentingSlice } from "./calculatorSlices/renting.ts";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage.ts";
import { settingsSlice } from "./settings/settings.ts";

const calculatorReducers = combineReducers({
  buying: buyingSlice.reducer,
  renting: rentingSlice.reducer,
  futurePredictions: futurePredictionsSlice.reducer,
});

const persistedState = loadFromLocalStorage();
const reducer = combineReducers({
  calculator: calculatorReducers,
  settings: settingsSlice.reducer,
});

export const store = configureStore({
  reducer,
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type CalculatorState = RootState["calculator"];
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
