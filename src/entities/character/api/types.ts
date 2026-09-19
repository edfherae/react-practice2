import type { Character } from "../model/types";

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface AllCharactersResponse {
  info: Info;
  results: Character[];
}
