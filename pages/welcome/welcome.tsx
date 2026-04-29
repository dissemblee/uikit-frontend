import { Link } from "react-router";
import styled from "./welcome.module.scss"
import { BentoSection } from "@widgets/BentoSection";

export function Welcome() {
  return (
    <main className={styled.Welcome}>
      <div className={styled.Welcome__Hero}>
        <h5 className={styled.Welcome__Domain}>
          // реестр компонентов
        </h5>
        <h1 className={styled.Welcome__Title}>
          Ваши компоненты. <br />
          <span>Без раздувания кода.</span>
        </h1>
        <p className={styled.Welcome__About}>
          Публикуйте, находите и устанавливайте отдельные UI-компоненты.  Только те части, которые вам действительно нужны.
        </p>
      </div>
      <BentoSection />
    </main>
  );
}
