import type { AppState, AppDispatch } from "./store";

// Типизация хуков без использования .withTypes, чтобы не конфликтовать с FSD
declare module "react-redux" {
  export function useDispatch(): AppDispatch;
  export function useSelector<T>(selector: (state: AppState) => T): T;
}
