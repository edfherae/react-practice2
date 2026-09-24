import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL as API } from "../../../shared/api";
import type { Character } from "../../../entities/character";
import { useParams } from "react-router-dom";
import styles from "./Character.module.scss";
import { Img } from "../../../widgets/character";

export function Character() {
  const { id } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["character", id],
    queryFn: () => axios.get<Character>(`${API}/character/${id}`),
    select(data) {
      return data.data;
    },
  });

  return (
    data && (
      <div className={styles["content"]}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Ошибка запроса</p>}
        {data && (
          <>
            <section>
              <header className={styles["header"]}>{data.name}</header>
              <Img character={data} />
            </section>

            <section>
              <p>{data?.species}</p>
              <p>{data?.gender}</p>
              <p>{data?.status}</p>
              <p>{data?.location.name}</p>
            </section>
          </>
        )}
      </div>
    )
  );
}
