import { Header } from "@widgets/Header";
import style from "./LandingPage.module.scss"
import { AboutTechnology } from "@widgets/AboutTechnology/AboutTechnology";

export default function LandingPage() {
  return (
    <>
      <Header />
      <main className={style.LandingPage}>
        <AboutTechnology />
      </main>
    </>
  );
}
