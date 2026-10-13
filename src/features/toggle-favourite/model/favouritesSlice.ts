import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

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
      state.ids.push(action.payload.characterId);
    },
    remove: (state, action: PayloadAction<{ characterId: CharacterId }>) => {
      state.ids = state.ids.filter((id) => id !== action.payload.characterId);
    },
  },
});
