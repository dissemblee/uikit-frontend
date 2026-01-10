import { BaseInput } from "@shared/ui/Inputs/Inputs"
import { Button } from "@shared/ui/Buttons/Button"

export const RegistrationForm = () => {
  return(
    <form>
      <BaseInput type="text" label="Логин" />
      <BaseInput type="password" label="Пароль" />
      <BaseInput type="password" label="Повторите пароль" />
      <BaseInput type="text" label="Имя"/>
      <BaseInput type="text" label="Фамилия"/>

      <br />
      <Button>Зарегистрироваться</Button>
    </form>
  )
}
