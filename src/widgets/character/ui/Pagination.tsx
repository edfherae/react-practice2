import { useNavigate } from "react-router-dom";
import { buttonStyles } from "../../../shared/ui/Button";

export function Pagination({
  to,
  page,
  pages,
}: {
  to: string;
  page: number;
  pages: number;
}) {
  const navigate = useNavigate();

  return (
    <section>
      <button
        disabled={page <= 1}
        onClick={() => navigate(`${to}/${page - 1}`)}
        className={buttonStyles["button"]}
      >
        Prev
      </button>
      <button
        disabled={page >= pages}
        onClick={() => navigate(`${to}/${page + 1}`)}
        className={buttonStyles["button"]}
      >
        Next
      </button>
    </section>
  );
}
