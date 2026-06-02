import { Link } from "react-router";
import styles from "./welcome.module.scss"
import { BentoSection } from "@widgets/BentoSection";

export function Welcome() {
  return (
    <main className={styles.Welcome}>
      <div className={styles.Welcome__Hero}>
        <h5 className={styles.Welcome__Domain}>
          // реестр компонентов
        </h5>
        <h1 className={styles.Welcome__Title}>
          Ваши компоненты. <br />
          <span>Без раздувания кода.</span>
        </h1>
        <p className={styles.Welcome__About}>
          Публикуйте, находите и устанавливайте отдельные UI-компоненты.  Только те части, которые вам действительно нужны.
        </p>
      </div>
      <BentoSection />
    </main>
  );
}
