import { useCreateRepositoryMutation } from "@entities/repository"
import { useForm } from "@shared/hooks/useForm"
import { Button } from "@shared/ui/Button"
import { Input, Select, Textarea } from "@shared/ui/Inputs"

export const CreateRepositoryForm = () => {
  const [create, { isLoading }] = useCreateRepositoryMutation()

  const form = useForm({
    initialValues: {
      name: "",
      description: "",
      framework: "",
      filePath: "",
      ownerId: "",
    },

    validate(values) {
      const errors: any = {}

      if (!values.name) errors.name = "Введите имя"
      if (!values.description) errors.description = "Введите описание"
      if (!values.framework) errors.framework = "Укажите фреймворк"

      return errors
    },

    async onSubmit(values) {
      await create(values)
    }
  })

  const frameworkOptions = [
    { value: "React", label: 'React' },
    { value: "Angular", label: 'Angular' },
    { value: "Vanilla", label: "Vanilla" },
  ]

  return(
    <form onSubmit={form.handleSubmit}>
      <Input
        label="Логин"
        {...form.field("name")}
      />

      <Textarea
        label="Описание"
        {...form.field("description")}
      />

      <Select
        label="Фреймворк"
        options={frameworkOptions}
        {...form.field("description")}
      />

      <Input
        label="Readme"
        type="file"
        {...form.field("filePath")}
      />
      
      <Button type="submit" disabled={form.isSubmitting} loading={isLoading}>
        Создать
      </Button>
    </form>
  )
}
