import { useAuth } from "@features/auth/hooks/use-auth";
import { useForm } from "@shared/hooks/useForm";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Inputs/Inputs";

export const LoginForm = () => {
  const { login, loading, error } = useAuth();

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
    },
  });

  return (
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
        Войти
      </Button>
    </form>
  );
};
