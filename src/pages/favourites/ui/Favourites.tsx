import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { StatusBar } from "../../../shared/ui/StatusBar/";
import { buttonStyles } from "../../../shared/ui/Button";
import { API_URL as URL } from "../../../shared/api";

import type { Character } from "../../../entities/character";

import { CharacterCard } from "../../../widgets/character";

import styles from "./Favourites.module.scss";

export function Favourites() {
  const navigate = useNavigate();
  const favouritesIds = useSelector((state) => state.favourites.ids);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["favourite", favouritesIds],
    queryFn: () =>
      axios.get<Character[]>(`${URL}/character/[${favouritesIds}]`),
    select(data) {
      return data.data;
    },
    enabled: favouritesIds.length > 0,
  });

  function handleClick(id: number) {
    navigate(`/character/${id}`);
  }

  return (
    <>
      <div className={styles["button-container"]}>
        <button onClick={() => navigate(-1)} className={buttonStyles["button"]}>
          Back
        </button>
      </div>
      <section className={styles["content"]}>
        {data === undefined && isLoading ? (
          <StatusBar status={"loading"} />
        ) : isError ? (
          <StatusBar status={"error"}>{error.message}</StatusBar>
        ) : (
          !data && <p>There is nothing in your favourites yet</p>
        )}
        {data &&
          data.map((character) => (
            <CharacterCard
              character={character}
              key={character.id}
              onClick={() => handleClick(character.id)}
            />
          ))}
      </section>
    </>
  );
}
