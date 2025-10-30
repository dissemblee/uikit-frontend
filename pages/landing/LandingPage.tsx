import { Header } from "@widgets/Header";
import style from "./LandingPage.module.scss"
import { AboutTechnology } from "@widgets/AboutTechnology/AboutTechnology";

export const LandingPage = () => {
  return (
    <>
      <Header />
      <main className={style.LandingPage}>
        <AboutTechnology />
      </main>
    </>
  );
}
