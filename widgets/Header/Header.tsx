import { Link, useNavigate } from "react-router"
import styles from "./Header.module.scss"
import { Button } from "@shared/ui/Buttons/Button"

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={styles.Header}>
      <Link to={"/"} className={styles.Header__logo}>
        <img
          src="/Union.svg"
          alt="Логотип"
          width={75}
          height={48}
        />
        <span className={styles.Header__name}>UIKIT</span>
      </Link>
      <nav className={styles.Header__nav}>
        <Link to="/components" className={styles.Header__link}>
          Компоненты
        </Link>
        <Link to="/docs" className={styles.Header__link}>
          Документация
        </Link>
      </nav>
      <div className={styles.Header__Buttons}>
        <Button variant="transparent" onClick={() => navigate("/login")}>
          ВОЙТИ
        </Button>
        <Button onClick={() => navigate("/registration")}>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </Button>
      </div>
    </header>
  )
}