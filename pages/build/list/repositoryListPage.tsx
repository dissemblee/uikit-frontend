import { Tabs } from "@shared/ui/Tabs/Tabs"
import { ComponentBuildsList } from "@widgets/ComponentBuildsList"
import { RepositoryBuildsList } from "@widgets/RepositoryBuildsList"
import styles from "./repositoryListPage.module.scss";

export const BuildListPage = () => {
  return (
    <main>
      <Tabs
        className={styles.repositoryListPage}
        items={[
          {
            key: "repositories",
            label: "репозитории",
            content: <RepositoryBuildsList />,
          },
          // {
          //   key: "components",
          //   label: "компоненты",
          //   content: <ComponentBuildsList />,
          // },
          {
            key: "components",
            label: "компоненты",
            content: <>заглушка</>,
          }
        ]}
      />
    </main>
  )
}