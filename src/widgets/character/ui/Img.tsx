import { useState } from "react";
import type { Character } from "../../../entities/character";
import placeholder from "../../../shared/ui/assets/characterPlaceholder.jpeg";

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
    <img
      className={className}
      src={status === "loaded" ? character.image : placeholder}
      alt={`${character.name}'s portrait`}
      onLoad={() => setStatus("loaded")}
      onError={() => setStatus("error")}
    />
  );
}
