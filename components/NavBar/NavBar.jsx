import NavLink from "../NavLink/NavLink";
import styles from "./navbar.module.css";

export default function NavBar() {
  return (
    <header className={styles.header}>
      <nav>
        <NavLink href={"/"}>
          Home
        </NavLink>
        <NavLink
          href={"/movies"}
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
}