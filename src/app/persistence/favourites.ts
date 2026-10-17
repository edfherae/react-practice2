import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { favouritesSlice } from "../../features/toggle-favourite";
import type { AppState } from "../model/store";
import toPositiveIntegerIds from "../../shared/lib/toPositiveIntegerIds";

export function readFavourites(): number[] {
  try {
    const res = JSON.parse(localStorage.getItem(favouritesSlice.name) ?? "[]");
    if (!Array.isArray(res)) return [];
    return toPositiveIntegerIds(res);
  } catch {
    return [];
  }
}

export const favouritesPersistence = createListenerMiddleware();

favouritesPersistence.startListening({
  matcher: isAnyOf(favouritesSlice.actions.add, favouritesSlice.actions.remove),
  effect: (_, api) => {
    const ids = (api.getState() as AppState)[favouritesSlice.name].ids;
    try {
      localStorage.setItem(favouritesSlice.name, JSON.stringify(ids));
    } catch (e) {
      if (e instanceof Error)
        console.error("Failed to save favourites in localStorage: ", e.message);
      else console.error("Failed to save favourites in localStorage: ", e);
    }
  },
});
