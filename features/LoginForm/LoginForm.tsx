import { BaseInput } from "@shared/ui/Inputs/Inputs"
import styled from "./LoginForm.module.scss"

export const LoginForm = () => {
  return(
    <section className={styled.LoginForm}>
      <h1>Страница Входа</h1>
      <form>
        <BaseInput label="Логин"/>
        <BaseInput type="password" label="Пароль"/>
      </form>
    </section>
  )
}
