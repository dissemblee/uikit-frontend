import { Header } from "@widgets/Header";
import styles from "./layouts.module.scss"
import { SideBar } from "@widgets/SideBar";

const NAV_ITEMS = [
  { href: '/repositories', icon: '🎨', text: 'Репозитории' },

];

export const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <body>
      <Header nav={NAV_ITEMS} />
      <SideBar nav={NAV_ITEMS} />
      <main className={styles.AdminLayout__Main}>
        {children}
      </main>
    </body>
  )
}