import { useState } from "react";
import type { Character } from "../../../entities/character";
import placeholder from "../../../shared/ui/characterPlaceholder.jpeg";

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
      {status === "loading" && (
        <img
          className={className}
          src={placeholder}
          alt={`${character.name}'s portrait`}
        ></img>
      )}
      {status === "error" && (
        <img
          className={className}
          src={placeholder}
          alt={`${character.name}'s portrait`}
        ></img>
      )}
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
