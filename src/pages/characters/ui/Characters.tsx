import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useId, useState, type ChangeEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { API_URL } from "../../../shared/api";
import { buttonStyles } from "../../../shared/ui/Button";
import { Pagination } from "../../../shared/ui/Pagination";
import { StatusBar } from "../../../shared/ui/StatusBar/";

import type { AllCharactersResponse } from "../../../entities/character";

import { CharacterCard } from "../../../widgets/character";

import styles from "./Characters.module.scss";

export function Characters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const name = searchParams.get("name") ?? "";
  const page = Number(searchParams.get("page")) || 1;
  const [search, setSearch] = useState(name);
  const [prevName, setPrevName] = useState(name);
  const query = `?page=${page}${name ? `&name=${name}` : ""}`;
  const navigate = useNavigate();
  const inputId = useId();
  const DEBOUNCE_TIMEOUT = 300;

  // Синхронизация состояния на случай, если параметры были изменены извне
  if (name !== prevName) {
    setPrevName(name);
    setSearch(name);
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["characters", name, page],
    queryFn: () =>
      axios.get<AllCharactersResponse>(`${API_URL}/character/${query}`),
  });

  useEffect(() => {
    if (search === name) return; // При навигации на другую страницу меняется setSearchParams, если фильтр пуст, кидает обратно на страницу 1 => если фильтр не менялся, эффект не запускаем
    const t = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        if (search)
          next.set("name", search); // Если изменилось значение фильтра, сброс до страницы 1, изменение параметра имени
        else next.delete("name"); // Если очистили поле фильтрации, сброс до страницы 1 и удаление имени из параметров
        next.set("page", "1");
        return next;
      });
    }, DEBOUNCE_TIMEOUT);

    return () => clearTimeout(t);
  }, [search, name, setSearchParams]);

  function goToPage(pageNumber: number) {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", `${pageNumber}`);
      return next;
    });
  }

  return (
    <>
      <Link to={"/characters/favourites"} className={buttonStyles["button"]}>
        To favourites
      </Link>
      <label htmlFor={inputId}>Filter by name</label>
      <input
        id={inputId}
        value={search}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
        }}
      />
      {isLoading && <StatusBar status={"loading"} />}
      {isError && <StatusBar status={"error"}>{error.message}</StatusBar>}
      {data && (
        <>
          <section className={styles["content"]}>
            {data.data.results.map((c) => (
              <CharacterCard
                character={c}
                onClick={() => navigate(`/character/${c.id}`)}
                key={c.id}
              />
            ))}
          </section>
          <Pagination
            page={page}
            totalPages={data.data.info.pages}
            onClick={goToPage}
          />
        </>
      )}
    </>
  );
}
