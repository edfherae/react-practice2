import { useState } from "react";
import type { Character } from "../../../entities/character";

export function Img({
  character,
  className,
}: {
  character: Character;
  className?: string;
}) {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    "loading",
  );

  return (
    <>
      {status === "loading" && <p>Loading...</p>}
      {status === "error" && <p>Ошибка запроса</p>}
      <img
        className={className}
        src={character.image}
        alt={`${character.name}'s portrait`}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
        style={{ display: status === "loaded" ? "block" : "none" }}
      />
    </>
  );
}
