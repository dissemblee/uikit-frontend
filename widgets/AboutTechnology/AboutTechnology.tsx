import { ExplanationBlock } from "@features/ExplanationBlock/ExplanationBlock"
import style from "./AboutTechnology.module.scss"
import { CliBlock } from "@features/CliBlock/CliBlock"

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