import { Outlet } from "react-router-dom";
import logo from "../logo/Rick_and_Morty.svg";
import styles from "./Layout.module.scss";

export default function Layout() {
  return (
    <>
      <header className={styles["header"]}>
        <img src={logo} alt="" />
      </header>
      <main className={styles["main"]}>
        <Outlet />
      </main>
      <footer className={styles["footer"]}>
        <span>2026</span>
      </footer>
    </>
  );
}
