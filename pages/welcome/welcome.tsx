import { Link } from "react-router";
import styled from "./welcome.module.scss"

export function Welcome() {
  return (
    <main className={styled.Welcome}>
      <nav className={styled.Welcome__nav}>
        <Link to="/login">Login</Link>
        <Link to="/registration">Register</Link>
        <Link to="/components/create">Создать компонент</Link>
      </nav>
    </main>
  );
}
