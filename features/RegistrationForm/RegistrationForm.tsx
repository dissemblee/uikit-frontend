import { BaseInput } from "@shared/ui/Inputs/Inputs"
import styled from "./RegistrationForm.module.scss"

export const RegistrationForm = () => {
  return(
    <section className={styled.RegistrationForm}>
      <h1>Страница Регистрации</h1>
      <form>
        <BaseInput type="text" label="Логин" />
        <BaseInput type="password" label="Пароль" />
        <BaseInput type="password" label="Повторите пароль" />
        <BaseInput type="text" label="Имя"/>
        <BaseInput type="text" label="Фамилия"/>
      </form>
    </section>
  )
}
