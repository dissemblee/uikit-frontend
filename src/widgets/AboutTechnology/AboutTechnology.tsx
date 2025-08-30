import { CliBlock } from "@/features/CliBlock/CliBlock"
import { ExplanationBlock } from "@/features/ExplanationBlock/ExplanationBlock"
import style from "./AboutTechnology.module.scss"

export const AboutTechnology = () => {
  return (
    <section className={style.AboutTechnology}>
      <ExplanationBlock />
      <div>
        <CliBlock />
      </div>
    </section>
  )
}