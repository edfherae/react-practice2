import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { favouritesSlice } from "../../features/toggle-favourite";
import {
  favouritesPersistence,
  readFavourites,
} from "../persistence/favourites";

const rootReducer = combineReducers({
  [favouritesSlice.name]: favouritesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(favouritesPersistence.middleware),
  preloadedState: {
    favourites: {
      ids: readFavourites(),
    },
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
