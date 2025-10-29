import { BaseInput } from "@shared/ui/Inputs/Inputs"
import styled from "./RegistrationForm.module.scss"

export const RegistrationForm = () => {
  return(
    <section className={styled.RegistrationForm}>
      <h1>Страница Регистрации</h1>
      <form>
        <BaseInput label="Логин"/>
        <BaseInput type="password" label="Пароль"/>
      </form>
    </section>
  )
}
