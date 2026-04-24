import { useUpdateUserMutation } from "@entities/user";
import { useForm } from "@shared/hooks/useForm";
import { Button } from "@shared/ui/Button";
import { FormError } from "@shared/ui/FormError";
import { Input } from "@shared/ui/Inputs";

export const EditProfile = () => {
  const [ updateUser, {isLoading} ] = useUpdateUserMutation()

  const form = useForm({
    initialValues: {
      email: "",
    },

    validate(values) {
      const errors: Record<string, string> = {};

      if (!values.email.trim()) errors.login = "Введите почту";

      return errors;
    },

    async onSubmit(values) {
      const result = await updateUser({
        data: {
          email: values.email
        }
      });

      if ('error' in result) {
        throw result.error
      }
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Почта"
        type="email"
        placeholder="example@email.com"
        {...form.field("email")}
      />

      <FormError message={form.submitError} />

      <Button type="submit" disabled={form.isSubmitting} loading={isLoading} loadingText="Меняем почту...">
        Сменить почту
      </Button>
    </form>
  )
}
