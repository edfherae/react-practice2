import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import type { Character } from "../../../entities/character";
import { API_URL as URL } from "../../../shared/api";
import { Link, useNavigate } from "react-router-dom";
import { CharacterCard } from "../../../widgets/character";
import styles from "./Favourites.module.scss";

export function Favourites() {
  const navigate = useNavigate();
  const favouritesIds = useSelector((state) => state.favourites.ids);
  const { data, isLoading, isError } = useQuery({
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
    <section className={styles["content"]}>
      <Link to={"/characters"}>
        <span>Characters</span>
      </Link>

      {}
      {data === undefined && isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p>Ошибка запроса</p>
      ) : (
        <p>There is nothing in your favourites yet</p>
      )}
      {data && (
        <>
          {data.map((character) => (
            <CharacterCard
              character={character}
              key={character.id}
              onClick={() => handleClick(character.id)}
            />
          ))}
        </>
      )}
    </section>
  );
}
