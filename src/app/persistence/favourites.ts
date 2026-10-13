import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { favouritesSlice } from "../../features/toggle-favourite";
import type { AppState } from "../model/store";

export function readFavourites(): number[] {
  try {
    return JSON.parse(localStorage.getItem(favouritesSlice.name) ?? "[]");
  } catch {
    return [];
  }
}

export const favouritesPersistence = createListenerMiddleware();

favouritesPersistence.startListening({
  matcher: isAnyOf(favouritesSlice.actions.add, favouritesSlice.actions.remove),
  effect: (_, api) => {
    const ids = (api.getState() as AppState)[favouritesSlice.name].ids;
    localStorage.setItem(favouritesSlice.name, JSON.stringify(ids));
  },
});
