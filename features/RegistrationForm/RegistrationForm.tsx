import { useForm } from "@shared/hooks/useForm"
import { AccountCheck } from "@shared/ui/AccountCheck";
import { Button } from "@shared/ui/Button"
import { FormError } from "@shared/ui/FormError";
import { Input } from "@shared/ui/Inputs/Inputs"
import { useNavigate } from "react-router";
import { useAuthContext } from "~/provider/AuthProvider";

export const RegistrationForm = () => {
  const { register, loading } = useAuthContext()
  const navigate = useNavigate();

  const form = useForm({
    initialValues: {
      username: "",
      password: "",
      email: ""
    },

    validate(values) {
      const errors: any = {}

      if (!values.username) errors.username = "Введите логин"
      if (!values.password) errors.password = "Введите пароль"
      if (!values.email) errors.email = "Введите почту"

      return errors
    },

    async onSubmit(values) {
      register(values)
      navigate("/login")
    }
  })

  return(
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Логин"
        {...form.field("username")}
        placeholder="dissemble1"
      />

      <Input
        label="Почта"
        type="email"
        {...form.field("email")}
        placeholder="example@mail.com"
      />

      <Input
        label="Пароль"
        type="password"
        {...form.field("password")}
        placeholder="qwerty1234"
      />

      <FormError message={form.submitError} />

      <AccountCheck isAccount />

      <Button type="submit" disabled={form.isSubmitting} loading={loading} loadingText="Создаем аккаунт" nonBlock>
        Зарегистрироваться
      </Button>
    </form>
  )
}
