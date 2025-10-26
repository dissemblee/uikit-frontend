import { Link } from "react-router"
import styles from "./Header.module.scss"
import { Button } from "@shared/ui/Buttons/Button"

export const Header = () => {
  return (
    <header className={styles.Header}>
      <div className={styles.Header__logo}>
        <img
          src="/Union.svg"
          alt="Логотип"
          width={75}
          height={48}
        />
        <span className={styles.Header__name}>UIKIT</span>
      </div>
      <nav className={styles.Header__nav}>
        <Link to="/" className={styles.Header__link}>
          Home
        </Link>
        <Link to="/components" className={styles.Header__link}>
          Компоненты
        </Link>
        <Link to="/docs" className={styles.Header__link}>
          Документация
        </Link>
      </nav>
      <div className={styles.Header__Buttons}>
        <button >

        </button>
        <Button variant="transparent">
          ВОЙТИ
        </Button>
        <Button>
          ЗАРЕГИСТРИРОВАТЬСЯ
        </Button>
      </div>
    </header>
  )
}