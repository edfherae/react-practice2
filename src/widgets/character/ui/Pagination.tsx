import { useNavigate } from "react-router-dom";

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
      >
        Prev
      </button>
      <button
        disabled={page >= pages}
        onClick={() => navigate(`${to}/${page + 1}`)}
      >
        Next
      </button>
    </section>
  );
}
