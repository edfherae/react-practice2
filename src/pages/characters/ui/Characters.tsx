import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL as API } from "../../../shared/api";
import type { AllCharactersResponse } from "../../../entities/character/api/types";

export function Characters() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: () => axios.get<AllCharactersResponse>(`${API}/character`),
    select(data) {
      return data.data.results;
    },
  });

  console.log(data);

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ошибка запроса</p>}
      {data && (
        <ul>
          {data.map((character) => (
            <div key={character.id}>
              <p>{character.name}</p>
              <p>{character.species}</p>
              <p>{character.status}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}
