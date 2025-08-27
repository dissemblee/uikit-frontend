import Link from "next/link"
import styles from "./Header.module.scss"
import { Button } from "@/shared/ui/Buttons/Button"

export const Header = () => {
  return (
    <header className={styles.Header}>
      <div>
        <span className={styles.Header__name}>UIKIT</span>
      </div>
      <nav className={styles.Header__nav}>
        <Link href="/" className={styles.Header__link}>
          Home
        </Link>
        <Link href="/components" className={styles.Header__link}>
          Компоненты
        </Link>
        <Link href="/docs" className={styles.Header__link}>
          Документация
        </Link>
      </nav>
      <div className={styles.Header__Buttons}>
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