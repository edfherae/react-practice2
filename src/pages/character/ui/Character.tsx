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
      <div className={styles["button-container"]}>
        <button onClick={() => navigate(-1)} className={buttonStyles["button"]}>
          Back
        </button>
      </div>

      {data && (
        <div className={styles["content-container"]}>
          {isLoading && <StatusBar status={"loading"} />}
          {isError && <StatusBar status={"error"}>{error.message}</StatusBar>}
          {data && (
            <>
              <section className={styles["card"]}>
                <header className={styles["header"]}>{data.name}</header>
                <Img className={styles["image"]} character={data} />
                <section className={styles["description"]}>
                  <p>Species</p>
                  <p>{data?.species}</p>
                  <p>Gender</p>
                  <p>{data?.gender}</p>
                  <p>Status</p>
                  <p>{data?.status}</p>
                  <p className={styles["first-col-last"]}>Location</p>
                  <p className={styles["second-col-last"]}>
                    {data?.location.name}
                  </p>
                </section>
              </section>
            </>
          )}
        </div>
      )}
    </>
  );
}
