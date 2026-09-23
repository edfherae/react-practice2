import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { favouritesSlice } from "../../features/toggle-favourite";

const rootReducer = combineReducers({
  [favouritesSlice.name]: favouritesSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const useAppSelector =
//   useSelector.withTypes<ReturnType<typeof store.getState>>();
// export const useAppDispatch = useDispatch.withTypes<typeof store.dispatch>();
