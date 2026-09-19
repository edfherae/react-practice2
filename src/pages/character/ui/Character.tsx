import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL as API } from "../../../shared/api";
import type { Character } from "../../../entities/character";

export function Character({ id }: { id: number }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters"],
    queryFn: () => axios.get<Character>(`${API}/character/${id}`),
    select(data) {
      return data.data;
    },
  });

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isError && <p>Ошибка запроса</p>}
      {data && (
        <ul>
          <div key={data.id}>
            <p>{data.name}</p>
            <p>{data.species}</p>
            <p>{data.status}</p>
          </div>
        </ul>
      )}
    </div>
  );
}
