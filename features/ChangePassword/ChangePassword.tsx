import { useChangePasswordMutation } from "@entities/auth"
import { useForm } from "@shared/hooks/useForm";
import { Button } from "@shared/ui/Button";
import { FormError } from "@shared/ui/FormError";
import { Input } from "@shared/ui/Inputs";

export const ChangePassword = () => {
  const [changePassword, {isLoading}] = useChangePasswordMutation()

  const form = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
    },

    validate(values) {
      const errors: Record<string, string> = {};

      if (!values.currentPassword.trim()) errors.currentPassword = "Введите текущий пароль";
      if (!values.newPassword.trim()) errors.newPassword = "Введите новый пароль";

      return errors;
    },

    async onSubmit(values) {
      const result = await changePassword({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword
      });

      if ('error' in result) {
        throw result.error
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Текущий пароль"
        type="password"
        placeholder="1234qwerty"
        {...form.field("currentPassword")}
      />

      <Input
        label="Новый пароль"
        type="password"
        placeholder="qwerty1234"
        {...form.field("newPassword")}
      />

      <FormError message={form.submitError} />

      <Button type="submit" disabled={form.isSubmitting} loading={isLoading} nonBlock>
        Сменить пароль
      </Button>
    </form>
  )
}