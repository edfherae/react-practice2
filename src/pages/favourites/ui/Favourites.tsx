import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { StatusBar } from "../../../shared/ui/StatusBar/";
import { buttonStyles } from "../../../shared/ui/Button";
import { API_URL as URL } from "../../../shared/api";
import getErrorMessage from "../../../shared/lib/getErrorMessage";

import type { Character } from "../../../entities/character";

import { CharacterCard } from "../../../widgets/character";

import styles from "./Favourites.module.scss";

export function Favourites() {
  const navigate = useNavigate();
  const location = useLocation();
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

  const handleBack = () => {
    console.log(location.key);
    if (location.key === "default") navigate("/characters");
    else navigate(-1);
  };

  function handleCardClick(id: number) {
    navigate(`/characters/${id}`);
  }

  return (
    <>
      <div className={styles["button-container"]}>
        <button onClick={handleBack} className={buttonStyles["button"]}>
          Back
        </button>
      </div>
      <section className={styles["content"]}>
        {isLoading && <StatusBar status={"loading"} />}
        {isError && (
          <StatusBar status={"error"}>{getErrorMessage(error)}</StatusBar>
        )}
        {!data ||
          (data.length === 0 && <p>There is nothing in your favourites yet</p>)}
        {data &&
          data.map((character) => (
            <CharacterCard
              character={character}
              key={character.id}
              onClick={() => handleCardClick(character.id)}
            />
          ))}
      </section>
    </>
  );
}
