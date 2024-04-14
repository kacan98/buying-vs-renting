import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { buyingSlice } from "./calculatorSlices/buying.ts";
import { futurePredictionsSlice } from "./calculatorSlices/futurePreditions.ts";
import { rentingSlice } from "./calculatorSlices/renting.ts";
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage.ts";
import { settingsSlice } from "./settings/settings.ts";

const reducer = combineReducers({
  buying: buyingSlice.reducer,
  renting: rentingSlice.reducer,
  futurePredictions: futurePredictionsSlice.reducer,
  settings: settingsSlice.reducer,
});

const persistedState = loadFromLocalStorage();

export const store = configureStore({
  reducer,
  preloadedState: persistedState,
});

store.subscribe(() => saveToLocalStorage(store.getState()));

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
