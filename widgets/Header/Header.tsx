"use client"
import { FaUser } from "react-icons/fa"
import styles from "./Header.module.scss"


interface NAV_ITEM {
  href: string;
  icon: string;
  text: string;
}

interface NAV_ITEMS {
  nav: NAV_ITEM[];
}

export const Header = ({ nav }: NAV_ITEMS) => {
  return (
    <header className={styles.Header}>
      <div className={styles.Header__content}>
        <h1>Панель</h1>
        <FaUser />
      </div>
    </header>
  )
}
