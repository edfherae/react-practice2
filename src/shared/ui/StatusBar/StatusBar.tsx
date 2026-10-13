import styles from "./StatusBar.module.scss";

type Status = "loading" | "error";

export function StatusBar({
  status,
  children,
}: {
  status: Status;
  children?: string;
}) {
  switch (status) {
    case "loading":
      return (
        <div className={`${styles["status-bar"]} ${styles["loading"]}`}>
          Loading...
        </div>
      );
    case "error": {
      return (
        <div className={`${styles["status-bar"]} ${styles["error"]}`}>
          {children ? (children.length === 0 ? "Error" : children) : "Error"}
        </div>
      );
    }
    default:
      status satisfies never;
  }
}
