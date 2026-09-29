import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { API_URL as API } from "../../../shared/api";
import { StatusBar } from "../../../shared/ui/StatusBar/";
import { buttonStyles } from "../../../shared/ui/Button";

import { Img } from "../../../widgets/character";

import type { Character } from "../../../entities/character";

import styles from "./Character.module.scss";

export function Character() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["character", id],
    queryFn: () => axios.get<Character>(`${API}/character/${id}`),
    select(data) {
      return data.data;
    },
  });

  return (
    <>
      <button onClick={() => navigate(-1)} className={buttonStyles["button"]}>
        Back
      </button>
      {data && (
        <div className={styles["content"]}>
          {isLoading && <StatusBar status={"loading"} />}
          {isError && <StatusBar status={"error"}>{error.message}</StatusBar>}
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
      )}
    </>
  );
}
