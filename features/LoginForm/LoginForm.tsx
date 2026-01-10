import { BaseInput } from "@shared/ui/Inputs/Inputs"
import styled from "./LoginForm.module.scss"
import { Button } from "@shared/ui/Buttons"

export const LoginForm = () => {
  return(
    <form className={styled.LoginForm}>
      <BaseInput label="Логин"/>
      <BaseInput type="password" label="Пароль"/>
      
      <br />
      <Button>Войти</Button>
    </form>
  )
}
