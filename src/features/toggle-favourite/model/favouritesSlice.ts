import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { isPositiveInteger } from "../../../shared/lib/isPositiveInteger";

type CharacterId = number;
interface State {
  ids: CharacterId[];
}

const initialState: State = {
  ids: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<{ characterId: CharacterId }>) => {
      if (
        !state.ids.includes(action.payload.characterId) &&
        isPositiveInteger(action.payload.characterId)
      )
        state.ids.push(action.payload.characterId);
    },
    remove: (state, action: PayloadAction<{ characterId: CharacterId }>) => {
      state.ids = state.ids.filter((id) => id !== action.payload.characterId);
    },
  },
});
