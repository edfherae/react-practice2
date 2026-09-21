import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL as API } from "../../../shared/api";
import type { AllCharactersResponse } from "../../../entities/character/";
import styles from "./Characters.module.scss";
import type { Character } from "../../../entities/character";
import { useState } from "react";

export function CharacterCard({ character }: { character: Character }) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <div className={styles["character-card"]}>
      {character && (
        <>
          <div className={styles["character-card-title"]}>{character.name}</div>
          {status === "loading" && <p>Loading...</p>}
          {status === "error" && <p>Ошибка запроса</p>}
          <img
            className={styles["character-card-image"]}
            src={character.image}
            alt={`${character.name}'s portrait`}
            onLoad={() => setStatus("loaded")}
            onError={() => setStatus("error")}
            style={{ display: status === "loaded" ? "block" : "none" }}
          />
        </>
      )}
    </div>
  );
}

export function Characters() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: () => axios.get<AllCharactersResponse>(`${API}/character`),
    select(data) {
      return data.data.results;
    },
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ошибка запроса</p>}
      {data &&
        data.map((character) => (
          <CharacterCard character={character} key={character.id} />
        ))}
    </div>
  );
}
