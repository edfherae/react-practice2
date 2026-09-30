import { useDispatch, useSelector } from "react-redux";
import type React from "react";

import iconBlankStar from "../../../../shared/ui/assets/iconBlankStar.png";
import iconStar from "../../../../shared/ui/assets/iconStar.png";

import type { Character } from "../../../../entities/character";

import { favouritesSlice } from "../../../../features/toggle-favourite";

import styles from "./CharacterCard.module.scss";
import { Img } from "../Img";

export function CharacterCard({
  character,
  onClick,
}: {
  character: Character;
  onClick: () => void;
}) {
  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourites.ids);
  const isFavourite = favourites.find((id) => id === character.id);

  function handleClickFavourite(e: React.MouseEvent) {
    e.stopPropagation();
    if (isFavourite)
      dispatch(favouritesSlice.actions.remove({ characterId: character.id }));
    else if (!isFavourite)
      dispatch(favouritesSlice.actions.add({ characterId: character.id }));
  }

  return (
    <div className={styles["card"]} onClick={onClick}>
      {character && (
        <>
          <header className={styles["card-header"]}>
            <span className={styles["card-title"]}>{character.name}</span>
            <img
              src={isFavourite ? iconStar : iconBlankStar}
              alt="star"
              className={styles["card-star"]}
              onClick={handleClickFavourite}
            />
          </header>
          <Img className={styles["card-image"]} character={character} />
        </>
      )}
    </div>
  );
}
