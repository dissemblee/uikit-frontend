import { useAuth } from "@features/auth/hooks/use-auth";
import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { Input } from "@shared/ui/Inputs/Inputs"
import { useNavigate } from "react-router";
export const RegistrationForm = () => {
  const { register, loading, error } = useAuth();
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
      />

      <Input
        label="Почта"
        type="email"
        {...form.field("email")}
      />

      <Input
        label="Пароль"
        type="password"
        {...form.field("password")}
      />

      <Button type="submit" disabled={form.isSubmitting} loading={loading}>
        Зарегистрироваться
      </Button>
    </form>
  )
}
