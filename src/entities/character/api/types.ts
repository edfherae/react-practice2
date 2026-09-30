import type { Character } from "../model/types";

interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface MultiplePagesResponse {
  info: Info;
  results: Character[];
}
