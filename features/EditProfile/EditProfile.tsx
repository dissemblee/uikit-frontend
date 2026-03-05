import { useUpdateUserMutation } from "@entities/user";
import { useForm } from "@shared/hooks/useForm";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Inputs";

export const EditProfile = (id: number) => {
  const [ updateUser, {isError, isLoading} ] = useUpdateUserMutation()

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
      await updateUser({
        id: id,
        data: {
          email: values.email
        }
      });
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

      <Button type="submit" disabled={form.isSubmitting} loading={isLoading}>
        Сменить почту
      </Button>
    </form>
  )
}