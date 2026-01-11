"use client"
import { Link } from "react-router";
import styles from "./SideBar.module.scss"

interface NAV_ITEM {
  href: string;
  icon: string;
  text: string;
}

interface NAV_ITEMS {
  nav: NAV_ITEM[];
}

export const SideBar = ({ nav }: NAV_ITEMS) => {
  return (
    <aside className={styles.AdminLayout__Sidebar}>
      <nav className={styles.Sidebar__Nav}>
        <ul className={styles.Nav__Links}>
          {nav.map((item) => {
            // const isActive = pathname === item.href || 
            //   (item.href !== '/admin' && pathname?.startsWith(item.href));
            
            return (
              <li key={item.href} className={styles.Nav__Item}>
                <Link 
                  to={item.href}
                  className={`${styles.Nav__Link}`}
                >
                  <span className={styles.Nav__Icon}>{item.icon}</span>
                  <span className={styles.Nav__Text}>{item.text}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  )
}
