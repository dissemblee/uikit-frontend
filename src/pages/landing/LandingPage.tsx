import { AboutTechnology } from "@/widgets/AboutTechnology/AboutTechnology";
import { Header } from "@/widgets/Header/Header";
import style from "./LandingPage.module.scss"

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
