import { useForm } from "@shared/hooks/useForm";
import { Button } from "@shared/ui/Button";
import { FormError } from "@shared/ui/FormError";
import { Input } from "@shared/ui/Inputs/Inputs";
import { useNavigate } from "react-router";
import { useAuthContext } from "~/provider/AuthProvider";

export const LoginForm = () => {
  const { login, loading } = useAuthContext()
  const navigate = useNavigate()

  const form = useForm({
    initialValues: {
      login: "",
      password: "",
    },

    validate(values) {
      const errors: Record<string, string> = {};

      if (!values.login.trim()) errors.login = "Введите логин";
      if (!values.password.trim()) errors.password = "Введите пароль";

      return errors;
    },

    async onSubmit(values) {
      await login({
        username: values.login,
        password: values.password
      });
      navigate("/repositories")
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Логин"
        {...form.field("login")}
        placeholder="dissemble1"
      />

      <Input
        label="Пароль"
        type="password"
        {...form.field("password")}
        placeholder="qwerty1234"
      />
      <FormError message={form.submitError} />
      
      <Button type="submit" disabled={form.isSubmitting} loading={loading} loadingText="Пытаемся войти">
        🚀 Войти
      </Button>
    </form>
  );
};
