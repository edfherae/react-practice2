import styles from "./Pagination.module.scss";

import { buttonStyles } from "../Button";

export function Pagination({
  page,
  totalPages,
  onClick,
}: {
  onClick: (pageNumber: number) => void;
  page: number;
  totalPages: number;
}) {
  return (
    <section className={styles["container"]}>
      <button
        disabled={page <= 1}
        onClick={() => onClick(page - 1)}
        className={buttonStyles["button"]}
      >
        Prev
      </button>
      <button
        disabled={page >= totalPages}
        onClick={() => onClick(page + 1)}
        className={buttonStyles["button"]}
      >
        Next
      </button>
    </section>
  );
}
