import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type id = number;
interface State {
  ids: id[];
}

const initialState: State = {
  ids: [],
};

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: initialState,
  reducers: {
    add: (state, action: PayloadAction<{ characterId: id }>) => {
      state.ids.push(action.payload.characterId);
    },
    remove: (state, action: PayloadAction<{ characterId: id }>) => {
      state.ids = state.ids.filter((id) => id !== action.payload.characterId);
    },
  },
});
