import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL as API } from "../../../shared/api";
import type { AllCharactersResponse } from "../../../entities/character/";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from "./Characters.module.scss";
import { CharacterCard, Pagination } from "../../../widgets/character";
import { useEffect } from "react";

export function Characters() {
  // Page не будет undefined, т.к. этот компонент существует только на роуте "characters/page/:page"
  const { page } = useParams() as { page: string };
  const navigate = useNavigate();
  const pageNumber = Number(page);
  const isValidPage = !(isNaN(pageNumber) || pageNumber < 1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["characters", pageNumber],
    queryFn: () =>
      axios.get<AllCharactersResponse>(`${API}/character?page=${page}`),
    select(data) {
      return data.data;
    },
    enabled: isValidPage,
  });

  function handleClick(id: number) {
    navigate(`/character/${id}`);
  }

  useEffect(() => {
    if (!isValidPage) navigate("/characters/page/1", { replace: true });
  }, [isValidPage, navigate]);

  if (!isValidPage) return null;

  return (
    <>
      <Link to={"/characters/favourites"}>
        <span>favourites</span>
      </Link>
      <section className={styles["content"]}>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Ошибка запроса</p>}
        {data && (
          <>
            {data.results.map((character) => (
              <CharacterCard
                character={character}
                key={character.id}
                onClick={() => handleClick(character.id)}
              />
            ))}
            <Pagination
              to="/characters/page/"
              page={pageNumber}
              pages={data?.info.pages}
            />
          </>
        )}
      </section>
    </>
  );
}
