import type { Character } from "../../../entities/character";
import iconBlankStar from "../../../shared/ui/iconBlankStar.png";
import styles from "./CharacterCard.module.scss";
import { Img } from "./Img";

export function CharacterCard({
  character,
  onClick,
}: {
  character: Character;
  onClick: () => void;
}) {
  return (
    <div className={styles["card"]} onClick={onClick}>
      {character && (
        <>
          <header className={styles["card-header"]}>
            <span className={styles["card-title"]}>{character.name}</span>
            <img
              src={iconBlankStar}
              alt="star"
              className={styles["card-star"]}
            />
          </header>
          <Img className={styles["card-image"]} character={character} />
        </>
      )}
    </div>
  );
}
