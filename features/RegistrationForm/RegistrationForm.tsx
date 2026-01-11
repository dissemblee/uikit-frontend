import { useAuth } from "@features/auth/hooks/use-auth";
import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { Input } from "@shared/ui/Inputs/Inputs"

export const RegistrationForm = () => {
  const { register, loading, error } = useAuth();

  const form = useForm({
    initialValues: {
      login: "",
      password: "",
    },

    validate(values) {
      const errors: any = {}

      if (!values.login) errors.login = "Введите логин"
      if (!values.password) errors.password = "Введите пароль"

      return errors
    },

    async onSubmit(values) {
      register(values)
    }
  })

  return(
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Логин"
        {...form.field("login")}
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
